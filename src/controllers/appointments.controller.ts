import { Request, Response } from "express";
import { Appointments } from "../database/models/Appointments";

//POST

export const createAppointments = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const appDate = req.body.date;
        const userID = req.tokenData.id;
        const serviceID = req.body.service_id;

        //2.validacion
        if (!appDate || !serviceID) {
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
                date: appDate,
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

