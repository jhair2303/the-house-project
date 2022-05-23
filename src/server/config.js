import dotenv from "dotenv"

dotenv.config();

const config = {

MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/testdb",
PORT: process.env.PORT || 3333,
USER: process.env.USER,
PASS: process.env.PASS,
CLOUD_NAME: process.env.CLOUD_NAME,
API_KEY: process.env.API_KEY,
API_SECRET: process.env.API_SECRET
}

export default config;

