import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Services1719851655446 } from "./migrations/1719851655446-services";
import { Services } from "./models/Services";
import { Roles1719851618943 } from "./migrations/1719851618943-roles";
import { Roles } from "./models/Roles";
import { Users1719851639134 } from "./migrations/1719851639134-users";
import { Users } from "./models/Users";
import { Appointments1720020588882 } from "./migrations/1720020588882-appointments";
import { Appointments } from "./models/Appointments";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Services, Roles, Users, Appointments],
    migrations: [Services1719851655446,Roles1719851618943, Users1719851639134, Appointments1720020588882],
    synchronize: false,
    logging: false,
})