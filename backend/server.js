import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectMongoDB.js";

const app = express(); 
dotenv.config();

const PORT = process.env.PORT || 5000 


app.use(express.json()); // to parse the incoming requests with JSON payload
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server Running on port ${PORT}`)
}); 