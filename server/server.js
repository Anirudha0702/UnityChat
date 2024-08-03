import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import UserRouter from "./routes/user.routes.js"
import StatusRouter from "./routes/status.routes.js"
// import authRouter from "./routes/auth.routes.js"
const app = express()
dotenv.config()
app.use(express.json());
app.use(cors(
    {
        origin: "*",
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    
    }
));
mongoose.set('strictQuery', true)

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected")
    }catch(error){   
        console.log(error+"😏")
        throw process.exit()
    }
}
// app.use("/api/users",userRouter)
// app.use('/api/auth',authRouter)
console.log("HIt server")
app.use("/api/users",UserRouter)
app.use("/api/status",StatusRouter)
app.get("/",(req,res) => {
    res.send("The server is running")
})
app.listen(3000 , async() => {
    await connectDb() 
    console.log("The server is running")
})
