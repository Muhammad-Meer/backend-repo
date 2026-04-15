const accountmodel  = require('../models/account.model')



async function createTransaction(req, res) {

  const { fromAccount, toAccount, amount, idempotencykey } = req.body;
 
  if(!fromAccount  ||   !toAccount  ||  !amount||   !idempotencykey ) {
    return res.status(400).json({
      message : "every field is requiresd"
    })
  } 

  const fromAccountuser = await accountmodel.findOne({
    _id: fromAccount
})


  const toAccountuser = await  accountmodel.findOne({
    _id:  toAccount
  })

  if(!fromAccountuser || !toAccountuser) {
    return res.status(400).json({
    message: " Invalid accounts"
    })}
} 