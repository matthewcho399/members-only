const express = require("express");
const path = require("node:path");
const router = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

require("./config/passport");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(3000, () => console.log("app listening on port 3000!"));
