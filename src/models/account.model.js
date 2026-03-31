const mongoose = require('mongoose')

const accountschemma = new mongoose.Schema({

   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true , "Account is must be assoicated with a user" ],
    index: true
   },

status: {
  type: String,
  enum: ["ACTIVE", "FROZEN", "CLOSED"],
  default: "ACTIVE"
},

   currency: {
    type: string,
    required:  [true , "currency is required for creating an account"],
    default: "PKR"   }

},
     {timestamps: true

})

accountschemma.index({user: 1, status: 1})


const accountmodel = mongoose.model("account", accountschemma)
module.exports = accountmodel