import { AppDataSource } from "../db";
import { Roles } from "../models/Roles";

export const rolesSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const userRole = new Roles();
        userRole.id = 1;
        userRole.name = "user";
        await userRole.save();

        const adminRole = new Roles();
        adminRole.id = 2;
        adminRole.name = "admin";
        await adminRole.save();

        const tatuadorRole = new Roles();
        tatuadorRole.id = 3;
        tatuadorRole.name = "tatuador";
        await tatuadorRole.save();

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