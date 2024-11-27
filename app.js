const express = require("express");
const path = require("node:path");
const router = require("./routes/index");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(3000, () => console.log("app listening on port 3000!"));
