import 'dotenv/config';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const databaseConfig : PostgresConnectionOptions = {
    type : "postgres",
    password : process.env.DB_PASSWORD,
    username :  process.env.DB_USERNAME,
    host :  process.env.DB_HOST,
    database :  process.env.DB_DATABASE,
    connectTimeoutMS : 360000,
    logging : false,
    poolSize : 1000,
    port : 5432,
}