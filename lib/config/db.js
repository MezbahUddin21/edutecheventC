import mongoose from "mongoose";

export const ConnectDB = async()=>{
    await mongoose.connect('mongodb+srv://mezbah:mezbah@cluster0.ijdfsx6.mongodb.net/edutech');
    console.log("DB Connected");

}
