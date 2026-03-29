const express = require('express')
const authcontroller = require('../controller/auth.controller')

const router = express.Router()



router.post('/user/register', authcontroller.userregistercontroller )
router.post('/user/login', authcontroller.userlogincontroller )


module.exports = router