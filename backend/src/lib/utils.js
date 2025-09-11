import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = async (userId , res) =>{

    const secrect = process.env.JWT_SECRECT_KEY

    if(!secrect){
        throw new Error('JWT_SECRECT is messing')
    }

    const token = jwt.sign({userId},secrect,{
        expiresIn:'7d'
    })

    res.cookie('jwt', token,{
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.Node_Env != process.env.development
    })

    return token
}