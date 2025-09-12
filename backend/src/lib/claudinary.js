import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

const CLOUD_NAME = process.env.CLAUDINARY_CLOUD_NAME
const CLOUD_API_KEY = process.env.CLAUDINARY_API_KEY
const CLOUD_SECRECT = process.env.CLAUDINARY_SECRECT

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUD_API_KEY,
    api_secret:CLOUD_SECRECT
})

export default cloudinary