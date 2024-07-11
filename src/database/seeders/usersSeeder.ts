import bcrypt from 'bcrypt';
import { AppDataSource } from "../db";
import { Users } from "../models/Users";

export const usersSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const user = new Users();
        user.id = 1;
        user.email = "user@user.com";
        user.password_hash = bcrypt.hashSync("123456789", 10);
        user.role_id = 1
        await user.save();

        const adminUser = new Users();
        adminUser.id = 2;
        adminUser.email = "admin@admin.com";
        adminUser.password_hash = bcrypt.hashSync("123456789", 10);
        adminUser.role_id = 2
        await adminUser.save();

        const tatuadorUser = new Users();
        tatuadorUser.id = 3;
        tatuadorUser.email = "tatuador@tatuador.com";
        tatuadorUser.password_hash = bcrypt.hashSync("123456789", 10);
        tatuadorUser.role_id = 3
        await tatuadorUser.save();

        console.log("==========================");
        console.log("Users seeder successfully");
        console.log("==========================");

    } catch (error: any) {
        console.error("==========================");
        console.error('ERROR USER SEEDER', error.message);
        console.error("==========================");

    } finally {
        await AppDataSource.destroy();
    }
}