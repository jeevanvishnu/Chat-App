import {app , server} from './socket.js'
import express from 'express'
import dotenv from "dotenv";
import logger from "morgan";
import path from 'path'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import authRouter from "./router/auth.router.js";
import messageRouter from './router/message.router.js'
import { connectDb } from "./lib/db.js";


dotenv.config();
const __dirname = path.resolve()
// middleware setup
app.use(logger("dev"));
app.use(express.json({limit:'10mb'}));
app.use(cors({origin:process.env.CLIENT_URL , credentials:true}))
app.use(express.urlencoded({limit:'10mb', extended: true }));
app.use(cookieParse())
app.use("/api/auth", authRouter);
app.use('/api/message',messageRouter)

// Make ready to production
if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname , '../frontend/dist')))
}

app.get(/(.*)/,(_ ,res)=>{
   res.sendFile(path.join(__dirname , '../frontend/dist/index.html'))
})
// Port setup
const PORT = process.env.PORT || 3000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`The Port has running on ${PORT}`);
  });
});
