import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

import userRoutes from './src/routes/user.route.js';
import categoryRoutes from './src/routes/category.route.js';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));



app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`)
});