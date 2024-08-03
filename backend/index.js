import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ShirtRoute from "./routes/ShirtRoute.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(ShirtRoute);

app.listen(process.env.APP_PORT, () => {
    console.log("Server Up and Running ")
})