const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')



async function authmiddleware(req , res , next) {
  const token = req.cookies.token || req.authorization?.split(' ') [1]

  if(!token) {

    return res.status(401).json({message : "unauthorized"})
  }

  try {
      const decoded = jwt.verify(token , process.env.SECRET)

      const user = await usermodel.findById(decoded.userId)

      req.user = user
      console.log(req.user);

      return next()
  } catch (error) {
    return res.status(401).json({message : "unauthorized"})
  }
}

module.exports = authmiddleware