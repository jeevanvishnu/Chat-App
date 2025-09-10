import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

// Port setup 
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`The port has running on ${PORT}`))