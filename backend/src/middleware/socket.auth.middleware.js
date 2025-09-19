import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";
dotenv.config()
export const socketAuthMiddleware = async (socket, next) => {
  // extract token from http-cookie only
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
       .find((row) => row.startsWith("jwt="))   
      ?.split("=")[1]; 

    if (!token) {
      console.log("Socket connecton rejected No token provide");
      return next(new Error("Unauthorized No token provide"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    if (!decoded) {
      console.log("Sockectio rejected ! No token provided");
      return next(new Error("Unauthorized No token Provide"));
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("Socket io rejected User is not found");
      return next(new Error("Unauthorized No User"));
    }
    socket.user = user;
    socket.userId = user._id.toString();
    console.log(`socket authentication for user ${user.fullName}`);
    
    next();
  } catch (error) {
    console.log("Error is socketAuthMiddleware");
    throw new Error(error);
  }
};
