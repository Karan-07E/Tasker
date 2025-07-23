import express from 'express';
import notesRoutes from './Routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//middleware
app.use(express.json());
app.use('/api/notes', notesRoutes);


app.listen(PORT, () => {
    console.log('server running on port', PORT);
})