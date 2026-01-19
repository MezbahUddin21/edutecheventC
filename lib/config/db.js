import mongoose from "mongoose";

export const ConnectDB = async()=>{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB Connected");

}