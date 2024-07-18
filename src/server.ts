import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { createServices, deleteServicesById, getServices, updateServicesById } from './controllers/services.controller';
import { getUserProfile, getUsers, updateUserProfile } from './controllers/users.controller';
import { login, register } from './controllers/auth.controller';
import { auth } from './middlewares/auth';
import { isAdmin } from './middlewares/isAdmin';
import { createAppointments, getAppointmentdById, getAppointmentsUser, updateAppointments } from './controllers/appointments.controller';

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
app.post('/api/services', auth, isAdmin, createServices)

//GET
app.get('/api/services', getServices)

//UPDATE
app.put('/api/services/:id', auth, isAdmin, updateServicesById)

//DELETE
app.delete('/api/services/:id', auth, isAdmin, deleteServicesById)


// AUTHENTICATION 

//POST
app.post('/api/register', register)
app.post('/api/login', login)


// USERS

//GET
app.get('/api/users', auth, isAdmin, getUsers)
app.get('/api/users/profile', auth, getUserProfile)

//PUT
app.put('/api/profile/update', auth, updateUserProfile)


//APPOINTMETS

//POST
app.post('/api/appointments/create', auth, createAppointments)

//UPDATE
app.put('/api/appointments/change/:id', auth, updateAppointments)

//GET
app.get('/api/appointments/user', auth, getAppointmentsUser)
app.get('/api/appointments/:id', auth, getAppointmentdById)      
