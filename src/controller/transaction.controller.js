const trancactionmodel = require('../models/transaction.model')
const accountmodel = require('../models/account.model')




async function createTransaction(req, res) {

  const { fromAccount, toAccount, amount, idempotencykey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencykey) {
    return res.status(400).json({
      message: "every field is requiresd"
    })
  }

  const fromAccountuser = await accountmodel.findOne({
    _id: fromAccount
  })


  const toAccountuser = await accountmodel.findOne({
    _id: toAccount
  })

  if (!fromAccountuser || !toAccountuser) {
    return res.status(400).json({
      message: " Invalid accounts"
    })
  }


  const isTransactionAlreadyExist = await trancactionmodel.findOne({
    idempotencykey: idempotencykey
  })

  if (isTransactionAlreadyExist) {

    if (isTransactionAlreadyExist.status === "COMPLETED") {

      return res.status(200).json({
        message: "Transaction already completed with this idempotency key"
      })

    }

    if (isTransactionAlreadyExist.status === "PENDING") {
      return res.status(200).json({
        message: "transaction is still processing"
      })
    }


    if (isTransactionAlreadyExist.status === "FAILED") {
      return res.status(500).json({
        message: "transaction failed previously , please try again"
      })
    }

    if (isTransactionAlreadyExist.status === "REVERSED") {
      return res.status(400).json({
        message: "transaction was reversed , please try again"
      })
    }

  }

  if (fromAccountuser.status !== "ACTIVE" || toAccountuser.status !== "ACTIVE") {

    return res.status(400).json({
      message: "both accounts must be active   or one of them is not active"
    })

  }

}

module.exports = { createTransaction }