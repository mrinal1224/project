const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Route for Register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: true,
        message: "user already Exists",
      });
    }

    // Hash The password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    console.log(salt);

    const newUser = await User(req.body);

    await newUser.save(); // saves the data in the database

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return res.send({
        success: false,
        message: "You are not registered Please Register First",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    res.send({
      success: true,
      message: "User Logged in",
    });
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
