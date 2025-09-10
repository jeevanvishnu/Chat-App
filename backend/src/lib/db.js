import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URL;

export const connectDb = async () => {
  try {
   const conn = await mongoose.connect(URL);
    console.log("Database connected sucessfull",conn.connection.host);
  } catch (error) {
    console.log(`Database Connection Failed ${error}`);
  }
};
