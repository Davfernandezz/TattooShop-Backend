import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Services1719851655446 } from "./migrations/1719851655446-services";
import { Services } from "./models/Services";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Services],
    migrations: [Services1719851655446],
    synchronize: false,
    logging: false,
})