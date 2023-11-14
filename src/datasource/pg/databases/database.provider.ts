import { DataSource } from "typeorm" 
import { DATA_SOURCE } from "@/constants"
import { databaseConfig } from "./database.config"
import * as path from "path" 
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


export const databaseProviders = [{
    provide : DATA_SOURCE , 
    useFactory : async () => {
        let config :PostgresConnectionOptions = databaseConfig
        const AppDataSource :  DataSource = new DataSource({
            ...config,
            entities : [path.join(__dirname , "../entities/**/*.js")]
        })
        return AppDataSource.initialize()
    }
}]