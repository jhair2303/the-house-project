import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: ObjectId,
    },
    image: {
        url: String,
        public_id: String
    }
})

export default mongoose.model("Image", imageSchema)