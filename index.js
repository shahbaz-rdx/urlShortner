const express = require("express");
const connectDB = require("./config/db");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 1000;

connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.json({ extended: false }));

/* app.get("/", (req, res) => {
  res.render("index", {
    url: null
  });
}); */

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(port, () => {
  console.log("Server is Up");
});
