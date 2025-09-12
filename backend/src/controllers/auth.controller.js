import status from 'http-status'
import User from '../model/user.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js'
import { sendWelcomeEmail } from '../emails/emailHandlers.js'
import cloudinary from '../lib/claudinary.js'

export const signup = async (req,res) =>{
  const {fullName , email , password} = req.body
    try {

        if(!fullName || !email || !password) {
            return res.status(status.NOT_FOUND).json({message:'All fields is required'})
        }

        if(password.length < 6) {
          return   res.status(status.NOT_FOUND).json({message:"Password must be atleast 6 letter"})
        }
        
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
        if(!emailRegex.test(email)){
            return res.status(status.BAD_REQUEST).json({message:"Email is Invalid"})
        }
        
        const user = await User.findOne({email:email})

        if(user) {
            return res.status(status.NOT_FOUND).json({message:'Email is already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
           const savedUser = await newUser.save()
            generateToken(savedUser._id , res)
            res.status(status.CREATED).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })

        // todo:send a welcome email by user
            try{

              await  sendWelcomeEmail(savedUser.email , savedUser.name , process.env.CLIENT_URL)

            }catch(error){

                console.log('Failed to send welcome email',error);
            }


        }else{
            res.status(status.NOT_FOUND).json({message:'Invaild user data'})
        }

    } catch (error) {
        console.log('Error in signup Controller' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:'Internal Server Error'})
    }
}

export const login = async (req , res)=>{
    const {email , password} = req.body

    try{

        const user = await User.findOne({email})
        
        if(!user) {
            return res.status(status.NOT_FOUND).json({message:'Invalid Credentials'})
        }
        const isPassword =  await bcrypt.compare(password,user.password)

        if(!isPassword) {
            return res.status(status.BAD_REQUEST).json({message:'Password is incorrect'})
        }
        generateToken(user._id,res)
        
        res.status(status.CREATED).json({
             _id:user._id,
             fullName:user.fullName,
             email:user.email,
             profilePic:user.profilePic
        })
    } catch (error){
        console.log('Error of login controller',error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        
    }
}

export const logout = (req , res) =>{
    
    try{
        res.cookie('jwt',"",{maxAge:0})
        res.status(status.OK).json({message:"Logout sucessfully"})

    } catch (error) {
        console.log('Error of logout controller',error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
         
    }
}

export const updateProfile = async (req , res) =>{
    const {profilePic} = req.body
    try {

        if(!profilePic){
            return res.status(status.BAD_REQUEST).json({message:"Profile pic is required"})
        }

        const userId = req.user._id

        const uploaderResponse = await cloudinary.uploader.upload(profilePic)

        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploaderResponse.secure_url},{new:true})

        res.status(status.OK).json(updateUser)
        
    } catch (error) {
        console.log('Error of update profile' , error);
        res.status(status.INTERNAL_SERVER_ERROR).json({message:"Internal Server error"})
    }
}