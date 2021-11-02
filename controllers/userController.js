"use strict";

const User = require('../models/user');
const { encrypt } = require("../middlewares/bcrypt-crypto");
const { generateJwtToken } = require('../middlewares/jwt-secure-api');

const signup = async (req, res) => {
  try {
    req.body.password = await encrypt(req.body.password);
    const user = new User(req.body);
    const newUser = await user.save();

    const jwtToken = await generateJwtToken(newUser);

    const data = { jwtToken, data: newUser };
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await new User.findOne({ username }).exec();

    const match = await decrypt(password, user.password);

    if (!match) {
      res.status(401).json({
        error: "Invalid username and password"
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { signup, login }