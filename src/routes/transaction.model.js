const Router = require('express').Router();
const { authmiddleware} = require('../middleware/auth.middleware');


const transactionrouter = Router();


transactionrouter.post('/', authmiddleware.authmiddleware )

module.exports = transactionrouter