const mongoose = require('mongoose');


const ledgerschema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.types.objectId,
    ref: "account",
    required: [true, "ledger must be associated with an account"],
    required: true,
    index: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: [true, "amount is required for a create ledger system"],
    immutable: true,
  }
})




