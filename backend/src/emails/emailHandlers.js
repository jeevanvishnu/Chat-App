import { resendClient, Sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"



export const sendWelcomeEmail = async (email , name , clintUrl) =>{
    console.log(Sender.email , Sender.name);
    
    const {error , data} = await resendClient.emails.send({
        from:`${Sender.name} <${Sender.email}>`,
        to:email,
        subject:'welcome to chatify',
        html:createWelcomeEmailTemplate(name,clintUrl)
    })

    if(error){
        console.log('Error of email handler',error);
        throw new Error('Failed to welcome email')
    }

    console.log("Welcome Email Send Sucessfully");
    
}