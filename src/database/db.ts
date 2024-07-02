import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Services1719851655446 } from "./migrations/1719851655446-services";
import { Services } from "./models/Services";
import { Roles1719851618943 } from "./migrations/1719851618943-roles";
import { Roles } from "./models/Roles";
import { Users1719851639134 } from "./migrations/1719851639134-users";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Services, Roles],
    migrations: [Services1719851655446,Roles1719851618943, Users1719851639134],
    synchronize: false,
    logging: false,
})