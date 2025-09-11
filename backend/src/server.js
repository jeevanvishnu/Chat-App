import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import path from 'path'
import authRouter from "./router/auth.router.js";
import messageRouter from './router/message.router.js'
import { connectDb } from "./lib/db.js";


dotenv.config();
const app = express();
const __dirname = path.resolve()

// middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  app.listen(PORT, () => {
    console.log(`The Port has running on ${PORT}`);
  });
});
