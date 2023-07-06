const express=require('express')
const cors=require('cors')
const app=express()
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const userRouter = require('./routes/userRoutes')
const chaletRouter=require('./routes/chaletRoutes')
const hallRouter=require('./routes/hallRoutes')
const resortRouter=require('./routes/resortRoutes')
const employeeRouter=require("./routes/employeeRoutes")
const financeRouter=require('./routes/financeRoutes')
const customerRouter=require('./routes/customerRoutes')
const reservationRouter=require('./routes/reservationRoutes')
const servicesRouter=require("./routes/servicesRoutes")
const reservationServicesRouter=require("./routes/reservationServicesRoutes")
const paymentsRouter=require("./routes/paymentRoutes")
const helmet =require("helmet")
const upload=require('express-fileupload')
const cookieParser = require('cookie-parser');
dotenv.config()
const databaseConnection = require('./connection/connect')
app.use(upload({
    limits:{fileSize:4*1024*1024}
}))
app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(cookieParser());
databaseConnection()

app.use('/employee',employeeRouter)
app.use('/users',userRouter)
app.use('/admin',chaletRouter)
app.use('/admin',hallRouter)
app.use('/admin',resortRouter)
app.use('/admin',customerRouter)
app.use('/admin',financeRouter)
app.use("/admin",servicesRouter)
app.use("/admin",reservationServicesRouter)
app.use("/user",paymentsRouter)
app.use(reservationRouter)
app.use('/chalet/img',express.static('./uploads/chalet'))
app.use('/hall/img',express.static('./uploads/hall'))
app.use('/resort/img',express.static('./uploads/resort'))
app.use('/expenses/img',express.static('./uploads/expenses'))
app.use('/user/img',express.static('./uploads/user'))

const PORT=process.env.PORT || 5000
app.listen(PORT , ()=>{console.log(`App is running on port ${PORT}`);})
