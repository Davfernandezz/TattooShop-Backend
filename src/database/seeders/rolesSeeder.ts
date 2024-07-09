import { AppDataSource } from "../db";
import { Roles } from "../models/Roles";

export const rolesSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const user = new Roles();
        user.id = 1;
        user.name = "user";
        await user.save();

        const admin = new Roles();
        admin.id = 2;
        admin.name = "admin";
        await admin.save();

        const tatuador = new Roles();
        tatuador.id = 3;
        tatuador.name = "tatuador";
        await tatuador.save();

        console.log("==========================");
        console.log("Roles seeder successfully");
        console.log("==========================");
        
    } catch (error: any) {
        console.error("==========================");
        console.error('ERROR ROLE SEEDER', error.message);
        console.error("==========================");

    } finally {
        await AppDataSource.destroy();
    }
}