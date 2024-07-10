import { Request, Response } from "express";
import { Appointments } from "../database/models/Appointments";

//POST

export const createAppointments = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const appointmentDate = req.body.date;
        const userID = req.tokenData.id;
        const serviceID = req.body.service_id;

        //2.validacion
        if (!appointmentDate || !serviceID) {
            return res.status(400).json(
                {
                    success: false,
                    message: "date and service is required"
                }
            )
        }

        //3.guardar en la base de datos
        const newAppointment = await Appointments.create(
            {
                date: appointmentDate,
                user_id: userID,
                service_id: serviceID
            }
        ).save();

        //5.responder
        res.status(201).json(
            {
                success: true,
                message: "appointment created successfully",
                data: newAppointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error creating appointment",
                error: error
            }
        )

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

        //3.responder
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

       // 1. recuperar Id de la base de datos
        const appointments = await Appointments.findOne(
            {
                where: {
                    users: { id: userID },
                    id: parseInt(paramsId)
                },
                relations: { services: {} }
            }
        )

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
                message: "error retrieving appointment",
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
                message: "error retrieving appointment",
                error: error
            }
        )
    }
}
