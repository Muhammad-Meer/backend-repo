const mongoose = require('mongoose')

const accountschemma = new mongoose.Schema({

   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: [true , "Account is must be assoicated with a user" ]
   },

   status: {
     enum: ["ACTIVE", "FROZEN","CLOSED"],
    message: "status can be ACTIVE, FROZEN or CLOSED"
   },

   currency: {
    type: string,
    required:  [true , "currency is required for creating an account"],
    dafult: "PKR"
   }

},
     {timestamps: true

})


const accountmodel = mongoose.model("account", accountschemma)

modeule.exports = accountmodel