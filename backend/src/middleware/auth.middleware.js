import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import "dotenv/config";

const secrect = process.env.JWT_SECRECT_KEY;

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, secrect);

    if (!decoded) return res.status(401).json({ message: "Invaild token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protectRout", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
