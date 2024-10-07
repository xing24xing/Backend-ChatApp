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
  'http://localhost:5173', // Local development
  'https://effulgent-pudding-2ca2ed.netlify.app', // Your Netlify frontend
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
