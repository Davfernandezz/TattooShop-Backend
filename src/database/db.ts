import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "TattooShop",
    entities: [],
    synchronize: false,
    logging: false,
})