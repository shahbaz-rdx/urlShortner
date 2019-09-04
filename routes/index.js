const express = require("express");
const router = express.Router();
const URL = require("../models/URL");

router.get("/", async (req, res) => {
  try {
    const url = await URL.find().sort({ date: -1 });
    if (url) {
      res.render("index", {
        url: url
      });
    }
  } catch (err) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await URL.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longURL);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
