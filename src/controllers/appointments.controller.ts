import { Request, Response } from "express";
import { Appointments } from "../database/models/Appointments";

//POST
export const createAppointments = async (req: Request, res: Response) => {
     try {
        //1. recuperar información
        const appointmentDate = req.body.date;
        const userID = req.tokenData.id;
        const serviceID = req.body.service_id;
        
        //2. validación
        if (!appointmentDate || !serviceID) {
            return res.status(400).json(
                {
                    success: false,
                    message: "date and service are required"
                }
            );
        }
        const currentDate = new Date();
        const appointmentDateObject = new Date(appointmentDate);
        if (appointmentDateObject < currentDate) {
            return res.status(400).json({
                success: false,
                message: 'cannot create appointment on a previous date',
            });
        }
        //3. guardar en la base de datos
        const newAppointment = await Appointments.create({
            date: appointmentDate,
            user_id: userID,
            service_id: serviceID
        }).save();
        //4. obtener información del servicio
        const appointmentWithService = await Appointments.findOne({
            where: { id: newAppointment.id },
            relations: { services: true }
        });
        if (!appointmentWithService) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve the newly created appointment with service details'
            });
        }
        //5. responder con la cita incluyendo el nombre del servicio
        res.status(201).json(
            {
                success: true,
                message: "appointment created successfully",
                data: appointmentWithService
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error creating appointment",
                error: error
            }
        );
    }
}

//UPDATE
export const updateAppointments = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const paramsID = req.params.id;
        const body = req.body;

        //2.actualizar en base de datos
        const appointments = await Appointments.findOne(
            {
                where: {
                    id: parseInt(paramsID)
                }
            }
        )
        //3.validacion
        if (!appointments) {
            return res.status(404).json(
                {
                    success: false,
                    message: "appointment does not exist"
                }
            )
        }
        const appointmentUpdated = await Appointments.update(
            {
                id: parseInt(paramsID)
            },
            body
        )

        //4.responder
        res.status(200).json(
            {
                success: true,
                message: "appointment updated",
                data: appointmentUpdated
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "appointment cant be updated",
                error: error
            }
        )

    }
}

//GET
export const getAppointmentdById = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const paramsId = req.params.id;
        const userID = req.tokenData.id;

        const appointments = await Appointments.findOne(
            {
                where: {
                    users: { id: userID },
                    id: parseInt(paramsId)
                },
                relations: { services: {} }
            }
        )

        //2.validacion
        if (!paramsId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "appointment does not exist"
                }
            )
        }
        //3.responder
        res.json(
            {
                success: true,
                message: "appointment retrived",
                data: appointments
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error retrieving appointment by id",
                error: error
            }
        )
    }
}

//GET
export const getAppointmentsUser = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const userId = req.tokenData.id;
        const appointments = await Appointments.find(
            {
                select: {
                    id: true,
                    date: true,
                    users: {
                        id: true,
                        email: true
                    },
                    services: {
                        id: true,
                        service_name: true
                    },
                },
                where:
                {
                    user_id: userId
                },
                relations: { users: {}, services: {} }
            }
        );
        //2.responder
        res.status(200).json(
            {
                success: true,
                message: "appointment retrived successfully",
                data: appointments
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                susscess: false,
                message: "error retrieving user appointments",
                error: error
            }
        )
    }
}

//DELETE
export const deleteAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointmentId = +req.params.id;
        const appointment = await Appointments.delete({
            id: appointmentId,
        });
        res.status(200).json({
            success: true,
            message: "Appointment successfully deleted",
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting appointment",
            error: error
        });
    }
};
