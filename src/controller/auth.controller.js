const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')



async function userregistercontroller(req , res) {
  const {email ,name , password } =  req.body;

  const isExist = usermodel.findOne({
    email
  })

  if(isExist) {
    return res.status(422).json({
      message: "user is already exist in with email",
      satatus: "failed"
    })
  }

  const user = await usermodel.create({
   email,
   name,
   password,
  })

  const token = 
}

module.exports = {userregistercontroller}