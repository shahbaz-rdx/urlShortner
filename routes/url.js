const express = require("express");
const router = express.Router();
const validURL = require("valid-url");
const shortID = require("shortid");
const config = require("config");

const URL = require("../models/URL");

router.post("/shorten", async (req, res) => {
  const { longURL } = req.body;
  const baseURL = config.get("baseURL");

  if (!validURL.isUri(baseURL)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortID.generate();

  if (validURL.isUri(longURL)) {
    try {
      let url = await URL.findOne({ longURL });
      if (url) {
        return res.json(url);
      } else {
        const shortURL = baseURL + "/" + urlCode;
        url = new URL({
          longURL,
          shortURL,
          urlCode,
          date: new Date()
        });
        await url.save();
        //return res.json(url);
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    return res.status(401).json("Invalid Long URL");
  }
});

module.exports = router;
