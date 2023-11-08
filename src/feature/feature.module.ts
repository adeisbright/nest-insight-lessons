import { DatabaseModule } from "@/datasource/mysql/database/database.module";
import { MysqlDataServices, SqlService } from "@/datasource/mysql/database/database.service";
import { mysqlProvider } from "@/datasource/mysql/providers/mysql.provider";
import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";

@Module({
    controllers : [UserController],
    providers : [
        ...mysqlProvider,
        {
            provide : MysqlDataServices,
            useClass : SqlService
        } , 
        UserService
    ] , 
    imports : [DatabaseModule]
})

export class FeatureModule {}