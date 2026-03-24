const app = require('./src/app')
const port = 3200



app.listen(port , () => {
  console.log("http://localhost:" + port)
})