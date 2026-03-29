const express =  require('express')

const authrouter = require('./routes/auth.routes')




const app = express()



app.use(express.json())

app.use("/auth/api", authrouter)

module.exports = app


