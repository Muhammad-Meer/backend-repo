const express = require('express')



const authmiddleware = require('../middleware/auth.middleware')
const creaateaccountcontroller = require('../controller/account.controller')






const router = express.Router()



// Post/ api/ accounts
// create a new account
// proteected route


router.post("/", authmiddleware.authmiddleware, creaateaccountcontroller.creaateaccountcontroller)




module.exports = router