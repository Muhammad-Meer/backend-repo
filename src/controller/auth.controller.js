const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userregistercontroller(req, res) {
  const { email, name, password } = req.body;

  const isExist = await usermodel.findOne({
    email,
  });

  if (isExist) {
    return res.status(422).json({
      message: "user is already exist in with email",
      status: "failed",
    });
  }

  const user = await usermodel.create({
    email,
    name,
    password,
  });

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
}

async function userlogincontroller(req, res) {
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "user not found with email",
        status: "failed",
      });
    }

    const isMatch = await user.comparepassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "invalid password",
        status: "failed",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "2d",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      status: error.message,
    });
  }

  res.cookie("token", token);

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: token,
  });
}

module.exports = { userregistercontroller, userlogincontroller };
