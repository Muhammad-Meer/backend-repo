const mongoose = require('mongoose')

const userscheema = mongoose.Schema({

    email: {
      type: String,
      required: [true , "email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+$/, ""],
      unique: [true , "email is already exist"],
    },
    

    name: {
      type: String,
      required: [true , "email is required for creating a user"],
    },
    
    name: {
      type: String,
      required: [true , "email is required for creating a user"],
    },
})