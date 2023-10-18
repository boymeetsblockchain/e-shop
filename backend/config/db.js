import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${con.connection.host}`)
    } catch (error) {
        console.log(`error`, error)
        process.exit(1)
    }
}

export default connectDB