import express from 'express';
import notesRoutes from './Routes/notesRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/ratelimiter.js';
import cors from 'cors';
dotenv.config({ quiet: true });
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
// Simple CORS configuration
app.use(cors({
    origin: true, // Allow all origins in development and production
    credentials: true
}));

app.use(express.json());    //to read data from the request body
app.use(rateLimiter);       // to limit the rate of requests

// middleware is used to handle something before the request reaches the route handler
// it is used to check if the user is authenticated or not and also used in something called as rate limiting
// rate limiting is something that describes how many requests a user can make in a given time period
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server running on port', PORT);
    });
});