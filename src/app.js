const express =  require('express')
const cookieparser = require('cookie-parser')


const app = express()


app.use(express.json())
app.use(cookieparser())

// Routes Required
const authrouter = require('./routes/auth.routes')
const accountrouter = require('./routes/account.routes')


// USER ROUTES
app.use("/api/auth", authrouter)
app.use("/api/accounts", accountrouter)

module.exports = app


