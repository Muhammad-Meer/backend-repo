const mongoose = require('mongoose');
const trancactionmodel = require('./transaction.model');


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
  },

  trancactio: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "transaction",
    required: [true, "amount is required for a create ledger system"],
    immutable: true,
  },
  type: {
    typr: string,

    enum: {
      values: ["DEBIT", "CREDIT"],
      message: "type can be either DEBIT or CREDIT",
    },
    required: [true, "ledger type is required"],
    immutable: true,    
  }
})






const ledgermodel = mongoose.model("ledger", ledgerschema)


module.exports = ledgermodel