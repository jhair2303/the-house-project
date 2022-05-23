import nodemailer from "nodemailer";
import configurations from "../server/config.js";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true,
    auth: {
        user: configurations.USER,
        pass: configurations.PASS
    }
})
