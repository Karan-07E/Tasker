import express from 'express';
import notesRoutes from './Routes/notesRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/ratelimiter.js';
import cors from 'cors';
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors({
    origin : "http://localhost:5173", // allow requests from the frontend
}));
app.use(express.json());    //to read data from the request body
app.use(rateLimiter);       // to limit the rate of requests

// middleware is used to handle something before the request reaches the route handler
// it is used to check if the user is authenticated or not and also used in something called as rate limiting
// rate limiting is something that describes how many requests a user can make in a given time period
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server running on port', PORT);
    });
});