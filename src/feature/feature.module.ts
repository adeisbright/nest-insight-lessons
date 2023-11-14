import { DatabaseModule } from "@/datasource/mysql/database/database.module";
import { MysqlDataServices, } from "@/datasource/mysql/database/database.service";
import { mysqlProvider } from "@/datasource/mysql/providers/mysql.provider";
import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { SearchModule } from "@/datasource/search/elastic.module";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PgModule } from "@/datasource/pg/databases/database.module";
import { pgProvider } from "@/datasource/pg/providers/pg.provider";
import { PgDataServices } from "@/datasource/pg/databases/database.service"; 
import { SqlService,TableService } from "@/datasource/pg/databases/database.service";
import { ProductService } from "./product/product.service";
import { ProductController } from "./product/product.controller";
// @Module({
//     controllers : [UserController],
//     providers : [
//         ...mysqlProvider,
//         {
//             provide : MysqlDataServices,
//             useClass : SqlService
//         } , 
//         UserService ,
//     ] , 
//     imports : [DatabaseModule , SearchModule]  
// })


@Module({
    controllers : [ProductController],
    providers : [
       ...pgProvider , 
       {
        provide : PgDataServices , 
        useClass : SqlService
       },
       TableService,
       ProductService
    ] , 
    imports : [PgModule , SearchModule]  
})

export class FeatureModule {}