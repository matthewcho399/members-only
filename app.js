const express = require("express");
const path = require("node:path");
const router = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const assetsPath = path.join(__dirname, "public");
require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const sessionStore = new pgSession({ pool: pool });

require("./config/passport");
app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.session());

app.use("/", router);

app.listen(3000, () => console.log("app listening on port 3000!"));
