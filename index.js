import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './route/userRoute.js';
import messageRoute from './route/messageRoute.js';
import databaseConnection from './utils/database.js';
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

// Define allowed origins
const allowedOrigins = [
    'https://twinkkletalk.netlify.app', // Your Netlify app domain
];

// Middleware
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // Enable cookies and auth headers
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
    databaseConnection();
    console.log(`Server listening on port ${PORT}`);
});
