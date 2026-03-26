const mongoose = require("mongoose");

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connect hogya");
    })
    .catch((error) => {
      console.log(error+ "es ka error ha");
      process.exit(1)
    });
}

module.exports = connectDB
