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
                    id: true,
                    email: true,
                    first_name: true,
                    created_at: true
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
                    first_name: true,
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
        const userId = req.tokenData.id;
        const { email, first_name, last_name, password_hash } = req.body;
        const fieldsToUpdate: { first_name?: string, email?: string } = {}
        let hashedPassword;
        if (first_name) {
            fieldsToUpdate.first_name = first_name
        }
        if (email) {
            fieldsToUpdate.email = email
        }
        if (password_hash) {
            if (password_hash.length < 8 || password_hash.length > 15) {
                return res.status(400).json({
                    success: false,
                    message: "password is not valid, 8 to 15 charachters must be needed"
                });
            }
            hashedPassword = bcrypt.hashSync(password_hash, 10);
        }
        const user = await Users.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        const usersUpdated: any = {
            email: email,
            first_name: first_name,
            last_name: last_name,
            password_hash: hashedPassword
        };
        await Users.update(
            {
                id: userId
            },
            fieldsToUpdate
        );
        return res.status(200).json({
            success: true,
            message: "user profile updated",
            data: usersUpdated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user profile cant be updated",
            error: error
        });
    }
}

//DELETE
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = +req.params.id;
        const user = await Users.delete({
            id: userId,
        });
        res.status(200).json({
            success: true,
            message: "User successfully deleted",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error
        });
    }
};