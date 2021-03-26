const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const bcrypt = require("bcrypt");
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

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

router.get("/", (req, res) => {
  return res.send({
    id: res.locals.account._id,
    firstName: res.locals.account.firstName,
    lastName: res.locals.account.lastName,
  });
});

router.patch("/", async (req, res) => {
  try {
    await User.findByIdAndUpdate(res.locals.account._id, {
      $set: {
        firstName: req.body.firstName || res.locals.account.firstName,
        lastName: req.body.lastName || res.locals.account.lastName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.patch("/profileImage", async (req, res) => {
  try {
    const image = req.files.image;
    const extension = image.name.split(".").pop().toLowerCase();
    if (!["png", "jpeg", "jpg"].includes(extension))
      return res.status(403).send({
        message: "Unsupported file format.",
      });
    fs.mkdirSync(path.join(__dirname, "images", res.locals.account._id), {
      recursive: true,
    });
    image.mv(
      path.join(__dirname, "images", res.locals.account._id),
      (error) => {
        if (error) throw error;
        return res.sendStatus(200);
      }
    );
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
