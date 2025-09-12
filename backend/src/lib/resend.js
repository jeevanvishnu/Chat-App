import {Resend} from 'resend'
import 'dotenv/config'

const Resend_Api = process.env.RESEND_API_KEY
export const resendClient = new Resend(Resend_Api)

export const Sender = {
email:process.env.EMAIL_FROM,
name:process.env.EMAIL_FROM_NAME
}