import express from "express";
import dotenv from "dotenv";
import logger from 'morgan'
import authRouter from "./router/auth.router.js";

dotenv.config();
const app = express();

// middleware setup
app.use(logger('dev'))
app.use("/api/auth", authRouter);

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The port has running on ${PORT}`));
