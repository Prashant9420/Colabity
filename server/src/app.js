import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// routes
import userRoutes from './routes/user.route.js';
app.use('/api/v1/users',userRoutes)


export { app };
