const AsyncHandler = require('../Utils/AsyncHandler.js')
const crypto = require('crypto')
require('dotenv').config()
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
const paymentProcess = AsyncHandler(async(req,res,next)=>{
    const {amount} = req.body 
    console.log(req.body)
    const options = {
        amount: Number(amount) * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      const order = await instance.orders.create(options);
    res.send({order,key:process.env.key_id})
})
const verifyPayment = AsyncHandler(async(req,res,next)=>{
    console.log(req.body)
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if(isAuthentic)
    return res.status(200).json({success:true,message:"Done payment"})
  else res.status(400).json({success:false,message:"invalid"})
})


module.exports = {paymentProcess,verifyPayment}