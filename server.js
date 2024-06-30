import dotenv from 'dotenv';
import express  from "express";
import connectDB from './config/db.js';
import auth from "./routes/auth.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from 'cors'

dotenv.config();

const app = express();

// Connecting database
connectDB();

// middlewares
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8080


// routes
app.use('/api/v1/auth',auth)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)



app.listen(port,()=>{
    console.log(`Listening on PORT ${port}`)
})