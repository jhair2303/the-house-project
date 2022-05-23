import { connectDB } from "./db.js";
import app from "./app.js"


connectDB();

app.listen(app.get("port"));

console.log("Server on port", app.get("port"));
