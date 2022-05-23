import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirm_password: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    count: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ""
    }
})

export default mongoose.model("User", userSchema)