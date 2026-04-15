const mongoose = require('mongoose');


const ledgerschema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.types.objectId,
    ref: "account",
    required: [true, "ledger must be associated with an account"],
    required: true,
    index: true,
  }
})




