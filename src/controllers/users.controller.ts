import { Request, Response } from "express";
import { Users } from "../database/models/Users";

//GET USERS

export const getUsers = async (req: Request, res: Response) => {
    try {
        // 1.recuperar de la bd los usuarios
        const users = await Users.find(
            {
                select: {
                    email: true,
                }
            }
        )

        //2.responder
        res.json(
            {
                success: true,
                message: "all users retrieved",
                data: users
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error retrieving users",
                error: error
            }
        )
    }
}

