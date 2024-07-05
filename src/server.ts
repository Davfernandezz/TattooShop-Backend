import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { createServices, deleteServicesById, getServices, updateServicesById } from './controllers/services.controller';
import { getUsers } from './controllers/users.controller';
import { login, register } from './controllers/auth.controller';

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
app.post('/api/services', createServices)

//GET
app.get('/api/services', getServices)

//UPDATE
app.put('/api/services/:id', updateServicesById)

//DELETE
app.delete('/api/services/:id', deleteServicesById)


// AUTHENTICATION 

//POST
app.post('/api/register', register)    
app.post('/api/login', login) 


// USERS

//GET
app.get('/api/users', getUsers)
