import { AppDataSource } from "../db"
import { Appointments } from "../models/Appointments";

export const appointmentsSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const appointment1 = new Appointments();
        appointment1.id = 1;
        appointment1.date = new Date("2024/07/10");
        appointment1.user_id = 1;
        appointment1.service_id = 1;
        await appointment1.save();

        const appointment2 = new Appointments();
        appointment2.id = 2;
        appointment2.date = new Date("2024/07/15");
        appointment2.user_id = 1;
        appointment2.service_id = 2;
        await appointment2.save();

        const appointment3 = new Appointments();
        appointment3.id = 3;
        appointment3.date = new Date("2024/07/20");
        appointment3.user_id = 1;
        appointment3.service_id = 4;
        await appointment3.save();

        const appointment4 = new Appointments();
        appointment2.id = 4;
        appointment2.date = new Date("2024/07/25");
        appointment2.user_id = 1;
        appointment2.service_id = 5;
        await appointment2.save();

        console.log("==========================");
        console.log("Appointments seeder successfully");
        console.log("==========================");

    } catch (error: any) {
        console.error("==========================");
        console.error('ERROR APPOINTMENTS SEEDER', error.message);
        console.error("==========================");

    } finally {
        await AppDataSource.destroy();
    }
}