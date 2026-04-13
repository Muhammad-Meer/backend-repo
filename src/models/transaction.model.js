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
   }
})