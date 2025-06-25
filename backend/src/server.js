// const express = require('express');
import cors from 'cors'; // for cross-origin resource sharing
import dotenv from "dotenv";
import express from 'express'; // add type= module in package.json
import { connectDB } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import nodesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
}))
app.use(express.json()) // helps to parse JSON Bodies: req.body
app.use(rateLimiter)

// custom middleware
app.use((req, res, next) => {
    console.log(`Method: ${req.method}\nURL: ${req.url}`)
    next()
})

app.use('/api/notes', nodesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
})

