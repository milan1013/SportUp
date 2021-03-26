const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Event = require("../models/Event");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const axios = require("axios");
router.use(async (req, res, next) => {
  try {
    let decoded = jwt.verify(
      req.header("X-Authentication"),
      process.env.JWT_SECRET
    );
    let updatedInformation = await User.findById(decoded.account._id);
    if (!updatedInformation) return res.sendStatus(404);
    if (decoded.account.password === updatedInformation.password) {
      res.locals.account = decoded.account;
      res.locals.ip = "178.149.69.65";
      // req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      let geoinformation = await axios.get(
        `http://api.ipstack.com/${res.locals.ip}?access_key=${process.env.GEOAPI_KEY}`
      );
      res.locals.geoinformation = geoinformation.data;
      return next();
    }
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  console.log(res.locals);
  try {
    let events = await Event.find({
      lat: {
        $gt: res.locals.geoinformation.latitude - 0.3,
        $lt: res.locals.geoinformation.latitude + 0.3,
      },
      lon: {
        $gt: res.locals.geoinformation.longitude - 0.3,
        $lt: res.locals.geoinformation.longitude + 0.3,
      },
    });
    return res.send(events);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (event.posterInfo.posterID != res.locals.account._id.toString())
      return res.sendStatus(403);
    await event.update({
      $set: {
        caption: req.body.caption || event.caption,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (event.posterInfo.posterID != res.locals.account._id.toString())
      return res.sendStatus(403);
    await event.delete();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    console.log(res.locals.account);
    if (!req.body.lon || !req.body.lat) return res.sendStatus(403);
    let event = new Event({
      caption: req.body.caption,
      posterInfo: {
        posterID: res.locals.account._id,
        posterName:
          res.locals.account.firstName + " " + res.locals.account.lastName,
      },
      lon: parseFloat(req.body.lon),
      lat: parseFloat(req.body.lat),
      type: ["Fudbal", "Košarka", "Tenis", "Odbojka", "Golf"].includes(
        req.body.type
      )
        ? req.body.type
        : "Ostalo",
    });
    await event.save();
    return res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
