import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connnect to mongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error Message:${error}`)
    }
}
 
export default connectDB