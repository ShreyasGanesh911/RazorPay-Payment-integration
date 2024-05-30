
const  express = require ('express')
const cors = require('cors')
const errorAPI = require('./Utils/Error')
const paymetRoute = require('./Routes/Payment.routes')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials:true}))
app.use('/payment',paymetRoute)

app.use(errorAPI)

module.exports = app