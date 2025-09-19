import express from 'express'
import http from  'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { socketAuthMiddleware } from './middleware/socket.auth.middleware.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
      origin: process.env.CLIENT_URL,
      credentials:true
    }
})

io.use(socketAuthMiddleware)

export function getReciverSocetId(userId){
    return userSocketMap[userId]
}

// online users data
const userSocketMap = {}

io.on('connection',(socket)=>{
    console.log('A user connected' ,socket.user.name);
    
    const userId = socket.userId
    userSocketMap[userId] = socket.id

    io.emit('getOnlineUser',Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log('A user disconnected',socket.user.name);
        delete userSocketMap[userId]
        io.emit('getOnlineUser',Object.keys(userSocketMap))
    })
})

export {app , io , server}