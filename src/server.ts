import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running. on port ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error)
    })