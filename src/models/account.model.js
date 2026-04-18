const mongoose = require('mongoose')
const ledgermodel = require('./ledger.model/')

const accountschemma = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Account is must be assoicated with a user"],
      index: true
   },

   status: {
      type: String,
      enum: ["ACTIVE", "FROZEN", "CLOSED"],
      default: "ACTIVE"
   },

   currency: {
      type: String,
      required: [true, "currency is required for creating an account"],
      default: "PKR"
   }

},
   {
      timestamps: true 
   })

accountschemma.index({ user: 1, status: 1 })

accountschemma.methods.getBalance = async function () {

   const Balance = await ledgermodel.aggregate([
      {
         $match: {
            acco
         }
      }
   ])
}


const accountmodel = mongoose.model("account", accountschemma)
module.exports = accountmodel