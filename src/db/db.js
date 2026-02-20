import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI} ${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONDODB connection error:",error);
    //exit() is different ways to exit the program as we face error 1,2,3.. are the different ways that can be given in the brackets
    process.exit(1); 
  }
}

export default connectDB;