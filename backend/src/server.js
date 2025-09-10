import express from "express";
import dotenv from "dotenv";
import logger from 'morgan'
import authRouter from "./router/auth.router.js";
import { connectDb } from "./lib/db.js";
dotenv.config();
const app = express();

// middleware setup
app.use(logger('dev'))
app.use("/api/auth", authRouter);

// Port setup
const PORT = process.env.PORT || 3000;
connectDb()
.then(()=>{
   app.listen(PORT,()=>{
    console.log(`The Port has running on ${PORT}`);
    
   })
})
