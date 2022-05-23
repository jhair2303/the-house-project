import mongoose from "mongoose";
import configurations from "./config.js";

export async function connectDB() {
    try {
        
    const db = await mongoose.connect(configurations.MONGODB_URI)
    console.log("Connected to:", db.connection.name);
    } catch (error) {
        console.log(error);
    }
}

