// imports
const  express = require ('express')
const errorAPI = require('./Utils/Error')
const ErrorHandler = require('./Utils/ErrorHandler')
const AsyncHandler = require('./Utils/AsyncHandler')
const app = express()
app.use(express.json())


app.get('/',AsyncHandler(async(req,res,next)=>{
    if(0)
        return next(new ErrorHandler("Test",600))
    res.status(200).json({success:true,message:message})
}))

app.use(errorAPI)

module.exports = app