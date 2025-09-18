import status from "http-status";
import User from "../model/user.model.js";
import Message from '../model/message.model.js'
import cloudinary from "../lib/claudinary.js";

export const getAllContact = async (req , res) =>{
    
    try {
        const logedInUserId = req.user._id
        const filterdUsers = await User.find({_id:{$ne:logedInUserId}}).select('-password')
        res.status(status.OK).json(filterdUsers)
        
    } catch (error) {
        console.log('Error is getAllContact' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server errror"})
        
    }
}

export const getMessageByUserId = async (req , res) =>{
    try {
        const myId = req.user._id
        const {id:userToChatId} = req.params
        const message = await Message.find({
            $or:[
              {senderId:myId , receivedId:userToChatId},
              {senderId:userToChatId , receivedId:myId}
            ]
        })
        res.status(status.OK).json(message)

    } catch (error) {
        console.log('Error is getMessageByUserId' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server errror"})
    }
}

export const sendMessage = async (req ,res) =>{

    try {
        const {image , text} = req.body
        const {id:reciverId} = req.params
        const senderId = req.user._id

        if(!text && !image){
           return res.status(status.BAD_REQUEST).json({message:"Text or image is required"})
        }

        if(senderId.equals(reciverId)){
           return res.status(status.BAD_REQUEST).json({message:"Cannot be send your self"})
        }

        const existingUser = await User.exists({_id:reciverId})

        if(!existingUser){
            return res.status(status.NOT_FOUND).json({message:"Recevier is not found"})
        }

        
        let imageUrl 

        if(image){
            const uploadeImage = await cloudinary.uploader.upload(image)
            imageUrl =  uploadeImage.secure_url
        }

        const newMessage = new Message({
            senderId:senderId,
            receivedId:reciverId,
            text:text,
            image:imageUrl
        })

        await newMessage.save()
        res.status(status.OK).json(newMessage)
        
    } catch (error) {
         console.log('Error is sendMessage' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server errror"})
    }
}

export const getChatPartner = async (req , res) =>{

    try {
        const loggedInUserId = req.user._id

        const message = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receivedId: loggedInUserId }],
    });

        const chatPartnerId = [
          ...new Set(
            message.map((map) =>
              map.senderId.toString() === loggedInUserId.toString() ? map.receivedId.toString() : map.senderId.toString()
            )
          ),
        ];
        
        const chatPartners = await User.find({_id : {$in:chatPartnerId}}).select('-password')

        res.status(status.OK).json(chatPartners)

    } catch (error) {
          console.log('Error is getChatPartner' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server errror"})
    }
}

