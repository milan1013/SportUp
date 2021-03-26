const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send({
    message: "Autentikacija",
    revision: 1,
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ mailAddress: req.body.mailAddress });
    if (!user) return res.sendStatus(404);
    if (await bcrypt.compare(req.body.password, user.password)) {
      let token = jwt.sign({ account: user }, process.env.JWT_SECRET);
      return res.send(token);
    }
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/register", async (req, res) => {
  try {
    let mailRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );
    let passwordRegex = new RegExp("d");
    console.log(req.body.firstName.trim().length);
    if (req.body.firstName.trim().length <= 1)
      return res.send({
        message: "Invalid first name.",
      });

    if (req.body.lastName.trim().length <= 1)
      return res.send({
        message: "Invalid last name.",
      });
    if (!mailRegex.test(req.body.mailAddress))
      return res.send({
        message: "Invalid e-mail address.",
      });
    let checkMail = await User.findOne({ mailAddress: req.body.mailAddress });
    console.log("NLCHCK", checkMail);
    if (checkMail)
      return res.send({
        message: "E-mail already registered.",
      });
    if (
      req.body.password.length >= 8 &&
      req.body.password.toLowerCase() !== req.body.password
    ) {
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mailAddress: req.body.mailAddress,
            password: hash,
          });
          await user.save();
          return res.sendStatus(200);
        });
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
