import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import connectDB from './config/db.js'
import{notFound,errorHandler} from './middlewares/errorMiddleware.js'
const port = process.env.PORT || 8000

connectDB();
const app = express()
// cookie parser
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("APi is running")
})

// app.use(notFound)
app.use(errorHandler)
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders', orderRoute);

app.listen(port, ()=>{console.log(`server running on port ${port}`)})
