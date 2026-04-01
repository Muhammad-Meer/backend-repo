const accountmodel = require('../models/account.model')



async function creaateaccountcontroller(req , res) {

    const user =  req.user

    const account = await accountmodel.create({user : user._id})
    res.status(201).json({
        message : "account created successfully",
        account : account
    })
}


module.exports = {creaateaccountcontroller}