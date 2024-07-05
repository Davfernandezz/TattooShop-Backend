import { Request, Response } from "express";
import { Users } from "../database/models/Users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//POST REGISTER

export const register = async (req: Request, res: Response) => {
    try {
        // 1.recuperar la informacion
        const email = req.body.email;
        const password_hash = req.body.password_hash;
        const role = req.body.role_id


        // 2.validar la informacion
        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "email and password are required"
                }
            )
        }

        if (password_hash.length < 8 || password_hash.length > 15) {
            return res.status(400).json(
                {
                    success: false,
                    message: "password is not valid, 8 to 15 charachters must be needed"
                }
            )
        }

        //3.encriptar password
        const hashedPassword = bcrypt.hashSync(password_hash, 10)


        //4.guardar en la base de datos
        const newUser = await Users.create(
            {
                email: email,
                password_hash: hashedPassword
            }
        ).save();

        //5.responder
        res.status(201).json(
            {
                success: true,
                message: "user registered",
                data: newUser
            }
        )
    }
    catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "user cant be registered",
                error: error
            }
        )
    }
}


//POST LOGIN

export const login = async (req: Request, res: Response) => {
    try {
         // 1. recuperar la info
         const email = req.body.email
         const password = req.body.password_hash
 
         // 2.validar la info
         if (!email || !password) {
             return res.json(400).json(
                 {
                     success: false,
                     message: "email and password must be needed"
                 }
             )
         }
 
         //3.comprobar si el usuario existe
         const user = await Users.findOne(
             {
                 where: { email: email }
             }
         )
 
         if (!user) {
             return res.status(400).json(
                 {
                     success: false,
                     message: "email or password not valid"
                 }
             )
         }
 
         //4.Comprobar la password
         const isPasswordValid = bcrypt.compareSync(password, user.password_hash)
 
         if (!isPasswordValid) {
             return res.status(400).json(
                 {
                     success: false,
                     message: "email or password not valid"
                 }
             )
         }
 
         //5.Creacion de token
         const token = jwt.sign(
             {
                id: user.id,
                role_id: user.role_id,
                email: user.email
             },
             process.env.JWT_SECRET as string,
             {
              expiresIn: "2h"
             }
         )
 
 
         res.status(200).json(
             {
                 success: true,
                 message: "user logged",
                 token: token
             }
         )
 
     } catch (error) {
         res.status(500).json(
             {
                 success: false,
                 message: "user cant be logged",
                 error: error
             }
         )
     }
 }