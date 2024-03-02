import express from 'express';
import { dbConn } from './db/dbconn.js';
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const PORT = process.env.PORT || 4000;


dbConn().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
}).catch((error) => {    
    console.log('Database connection failed: ',error);
})
