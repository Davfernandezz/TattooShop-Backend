import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { createServices, deleteServicesById, getServices, updateServicesById } from './controllers/services.controller';

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

    
    
    //SERVICES

    //POST
    app.post('/services', createServices) 

    //GET
    app.get('/services', getServices) 
    
    //UPDATE
    app.put('/services/:id', updateServicesById)

    //DELETE
    app.delete('/services/:id', deleteServicesById)