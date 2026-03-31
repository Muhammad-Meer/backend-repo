const usermodel = require('../models/user.model')



async function authmiddleware(req , res , next) {
  const token = req.cookies.token || req.authorization?.split(' ') [1]
  
}