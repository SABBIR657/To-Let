import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res)=>{
//     res.send("welcome to the home page");
// })

app.use(express.json()); // allow to parse incoming request from body -> req.body

app.use('/api/auth', authRoutes )

app.listen(PORT, ()=>{
    connectDB();
    console.log(`listening on ${PORT}`);
})

