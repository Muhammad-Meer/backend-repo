const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await usermodel.create({
    email,
    name,
    password: hashpassword,
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
     console.log("USER:", user);
    console.log("PASSWORD FROM BODY:", password);
    console.log("PASSWORD FROM DB:", user?.password);

    if (!user) {
      return res.status(401).json({
        message: "user not found with email",
        status: "failed 1",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "invalid password",
        status: "failed 2",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "server error",
      status: "failed 3",
      error: error.message,
    });
  }
}

module.exports = { userregistercontroller, userlogincontroller };
