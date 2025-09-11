
import status from 'http-status'
import User from '../model/user.model.js'
import bcrypt from 'bcrypt'

export const signup = async (req,res) =>{
  const {firstName , email , password} = req.body
    try {

        if(password.length < 6) {
          return   res.status(status[400]).json({message:"Password must be atleast 6 letter"})
        }
        
        const user = User.findOne({email:email})

        if(user) {
            return res.status(status[400]).json({message:'Email is already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            
        }else{
            res.status(status[400]).json({message:'Invaild user data'})
        }

    } catch (error) {
        
    }
}


export const login = (req , res) =>{

    try{

    } catch (error){

    }
}

export const logout = (req , res) =>{
    
    try{

    } catch (error) {

        
    }
}