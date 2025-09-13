import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcject.js";

export const arcjectProtection  = async (req,res,next) =>{

    try {

        const decision = await aj.protect(req);
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit) {
            res.status(429).json({message:"Too Many Requests. Please try again"})
          }else if(decision.reason.isBot){
            res.status(403).json({message:"No bot allowed"})
          }else{
            res.status(403).json({message:"Access denied by security policy"})
          }

        }

        // check for spoofed bots
        if (decision.results.some(isSpoofedBot)) {
          res
            .status(403)
            .json({
              error: "Spoofed bot detected",
              message: "Malicious but activity detected.",
            });
        }
        next()
        
    } catch (error) {
        console.log('Arcjet middlware error' , error);
        res.status(500).json({message:"Internal server error"})
    }


}
