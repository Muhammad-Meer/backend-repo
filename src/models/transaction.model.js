const mongoose = require('mongoose');


const transactionschema = new mongoose.Schema({
   account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: [true , "transaction must be associated with an account"],
    required: true,
    index: true,
   },
   toaccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: [true , "transaction must be associated with an account"],
    required: true,
    index: true,
   },
   status: {
    type: String,
    enum: {
    values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
    message: "status can be either PENDING, COMPLETED, FAILED or REVERSED",
    },
     dafult: "PENDING"
   },

    amount: {
      type: Number,
      required: [true , "amount is required for a transaction"],
        min: [0.01, "amount must be greater then zero"],
    },

    idempotencykey: {
      type: String,
    }

})