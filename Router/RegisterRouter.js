const express = require("express");
const registerRouter = express.Router();
const jwt = require("jsonwebtoken");
const { registerModel } = require("../Model/RegisterModel");
const bcrypt = require("bcrypt");

registerRouter.post("/registers", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await registerModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: "Already Registered" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new registerModel({ email, name, password: hash });
      await user.save();
      res.status(201).json({ message: "Register Successfully" });
    });
  } catch (error) {
    console.log(error);
    res.json({ massage: "server error" });
  }
});

registerRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ foo: "hee" }, "yes");
          res.status(200).json({ message: "login sucessfull", token });
        } else {
          res.json({ message: "wrong password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ massage: "Wrong Credential" });
  }
});

module.exports = { registerRouter };
