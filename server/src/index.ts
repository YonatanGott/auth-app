import * as dotenv from "dotenv"
dotenv.config({ path: '.env' })
import chalk from 'chalk';

import cors from 'cors';
import express from "express"
import { initMongoDB } from "./config/mongo.config"
import router from "./routes";
import cookieParser from "cookie-parser";

// express app
const app = express()
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
// middleware
app.use(express.json())
app.use(cookieParser());
// routes
app.use("/", router())
// connect to database
initMongoDB()

// app
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(chalk.blue(`Server is running on port ${PORT}`));
})