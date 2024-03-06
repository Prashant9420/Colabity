import express from 'express';
import { dbConn } from './db/dbconn.js';
import { socketServer } from './app.js';
import dotenv from 'dotenv';

const PATH = dotenv.config({path: '../.env'});
const PORT = process.env.PORT || 4000;


dbConn().then(() => {
    socketServer.listen(PORT, () => {
        console.log(`Socket server is running on PORT ${PORT}`);
    })
}).catch((error) => {    
    console.log('Database connection failed: ',error);
})
