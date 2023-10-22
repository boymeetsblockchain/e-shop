
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import connectDB from './config/db.js'
import{notFound,errorHandler} from './middlewares/errorMiddleware.js'
const port = process.env.PORT || 8000

connectDB();
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// cookie parser
app.use(cookieParser())



app.get("/",(req,res)=>{
    res.send("APi is running")
})

// app.use(notFound)
app.use(errorHandler)
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal',(req,res)=>res.send({clientId :process.env.PAYPAL_CLIENT_ID}))
app.use('/api/upload',uploadRoute)


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.listen(port, ()=>{console.log(`server running on port ${port}`)})
