import { v2 as cloudinary } from "cloudinary";
import configurations from "../server/config.js"

cloudinary.config({
    cloud_name: configurations.CLOUD_NAME,
    api_key: configurations.API_KEY,
    api_secret: configurations.API_SECRET
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}

