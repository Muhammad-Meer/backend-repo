const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const SendRegisterEmail = require('../services/email.services')

async function userregistercontroller(req, res) {
  const { email, name, password } = req.body;
  console.log(req.body);

  try {
    // Check if user already exists
    const isExist = await usermodel.findOne({ email });
    if (isExist) {
      return res.status(422).json({
        message: "User already exists with this email",
        status: "failed",
      });
    }

    // Create user (password will be hashed automatically by pre-save hook)
    const user = await usermodel.create({ email, name, password });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });

    await SendRegisterEmail.SendRegisterEmail(user.email, user.name)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      status: "failed",
      error: error.message,
    });
  }
}

async function userlogincontroller(req, res) {
    console.log(req.body);
  const { email, password } = req.body;


  try {
    // Include password in query with .select("+password")
    const user = await usermodel.findOne({ email }).select("+password");


    if (!user) {
      return res.status(404).json({
        message: "User not found with email",
        status: "failed",
      });
    }

    // Use schema method to compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        status: "failed",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      status: "failed",
      error: error.message,
    });
  }
}

module.exports = { userregistercontroller, userlogincontroller };