const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')



async function userregistercontroller(req , res) {
  const {email ,name , password } =  req.body;

  const isExist = await usermodel.findOne({
    email
  })

  if(isExist) {
    return res.status(422).json({
      message: "user is already exist in with email",
      status: "failed"
    })
  }

  const user = await usermodel.create({
   email,
   name,
   password,
  })

  const token = jwt.sign({userId: user._id}, process.env.SECRET, {expiresIn: "2d"})

  res.cookie("token", token,)
  res.status(201).json({
    user: {
    id: user._id,
    name: user.name,
    email: user.email
    },
    token: token
  })
}

module.exports = {userregistercontroller}