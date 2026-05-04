import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL environment variable is not set");
        }
        
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};