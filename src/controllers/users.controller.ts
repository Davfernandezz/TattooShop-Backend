import { Request, Response } from "express";
import { Users } from "../database/models/Users";
import bcrypt from 'bcrypt';

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

//GET USER PROFILE

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // 1.recuperar id del usuario a traves del del token
        const userId = req.tokenData.id;

        //2.buscarlo en la base de datos
        const user = await Users.findOne(
            {
                select: {
                    email: true,
                    created_at: true,
                },
                where: {
                    id: userId
                }
            }
        )
        //3.responder
        res.json(
            {
                success: true,
                message: "users profile retrieved",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "profile cant be retrieved"
            }
        )
    }
}

//UPDATE USER PROFILE
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        //1.recuperar informacion
        const userIdToUpdate = req.params.id
        const { first_name, last_name, email, password_hash } = req.body
        let newpassword
        // const {last_name} = req.body
        // const body = req.body

        if (password_hash) {
            newpassword = bcrypt.hashSync(password_hash, 10)
        }

        //2.actualizar en base de datos
        const usersUpdated = await Users.update(
            {
                id: parseInt(userIdToUpdate)
            },
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password_hash: newpassword
            }
        )
        //3.responder
        res.status(200).json(
            {
                success: true,
                message: "user profile updated",
                data: usersUpdated
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "user profile cant be updated",
                error: error
            }
        )
    }
}