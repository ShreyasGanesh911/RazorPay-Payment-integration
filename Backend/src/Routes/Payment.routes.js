const express = require('express')
const { paymentProcess, verifyPayment } = require('../controllers/Payment')

const paymetRoute = express.Router()
paymetRoute.post('/checkout',paymentProcess)
paymetRoute.post('/verify',verifyPayment)

module.exports = paymetRoute