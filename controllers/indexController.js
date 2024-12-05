const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { validateUser, validateMessage } = require("../lib/validators");
require("dotenv").config();

const signUpPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      });
    }
    try {
      const { firstName, lastName, username, password } = req.body;
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error(err);
        }
        await db.createUser(firstName, lastName, username, hashedPassword);
      });
      res.redirect("/login");
    } catch (err) {
      return next(err);
    }
  },
];

async function membershipPost(req, res) {
  if (
    req.body.passcode === process.env.PASSCODE &&
    req.user.membership_status === false
  ) {
    await db.grantMembership(req.user.id);
    res.render("membership", { msg: "Membership granted!" });
  } else if (
    req.body.passcode === process.env.PASSCODE &&
    req.user.membership_status === true
  ) {
    res.render("membership", { msg: "Already a member" });
  } else if (req.body.passcode !== process.env.PASSCODE) {
    res.render("membership", { msg: "Incorrect passcode" });
  }
}

async function dashboardGet(req, res) {
  const messages = await db.getAllMessages();
  res.render("dashboard", { membership: req.user.membership_status, messages });
}

const newMessagePost = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("message-form", {
        errors: errors.array(),
      });
    }
    try {
      const user_id = req.user.id;
      const { title, text } = req.body;
      const message_id = await db.createMessage(title, text);
      await db.linkMessageToUser(user_id, message_id);
      res.redirect("/dashboard");
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  signUpPost,
  membershipPost,
  dashboardGet,
  newMessagePost,
};
