import { Request, Response } from "express";
import { Services } from "../database/models/Services";

//POST

export const createServices = async (req: Request, res: Response) => {
    try {

        //1.recuperar informacion
        const service_name = req.body.service_name;
        const description = req.body.description;

        //2.validacion
        if (!service_name || !description) {
            return res.status(400).json(
                {
                    success: false,
                    message: "name and description is required"
                }
            )
        }

        //3.guardar en la base de datos
        const newService = await Services.create(
            {
                service_name: service_name,
                description: description
            }
        ).save();

        //4.responder
        res.status(201).json(
            {
                success: true,
                message: "service created successfully",
                data: newService
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error creating service",
                error: error
            }
        )
    }
}


//GET

export const getServices = async (req: Request, res: Response) => {
    try {

        //1.recuperar informacion
        const services = await Services.find()

        //2.responder
        res.status(200).json(
            {
                success: true,
                message: "all services retrieved succesfully",
                data: services
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "services cannot be recovered",
            error: error
        })
    }
}


//UPDATE

export const updateServicesById = async (req: Request, res: Response) => {
    try {

        //1.recuperar informacion
        const serviceIdToUpdate = req.params.id
        const body = req.body

        //2.actualizar en base de datos
        const authorUpdated = await Services.update(
            {
                id: parseInt(serviceIdToUpdate)
            },
            body
        )

        //3.responder
        res.status(200).json(
            {
                success: true,
                message: "service updated",
                data: authorUpdated
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "service cant be updated",
                error: error
            }
        )
    }
}


//DELETE

export const deleteServicesById = async (req: Request, res: Response) => {
    try {

        //1.recuperar informacion
        const serviceToBeDeleted = Number(req.params.id)

        //2.eliminarlo de la base de datos
        const serviceDeleted = await Services.delete(serviceToBeDeleted)

        if (!serviceDeleted.affected) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Service does not exist"
                }
            )
        }

        //3.responder
        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
            data: serviceDeleted
        })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error deleting service! Please, try again!",
                error: error
            }
        )
    }
}