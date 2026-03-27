const express = require('express')
const authcontroller = require('../controller/auth.controller')

const router = express.Router()



router.post('register', authcontroller.userregistercontroller )


module.exports = router