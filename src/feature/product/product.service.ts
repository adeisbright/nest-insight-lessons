import { Injectable } from "@nestjs/common";
import { PgDataServices,TableService } from "@/datasource/pg/databases/database.service";
import { Product } from "@/datasource/pg/entities/product";
import {SchedulerRegistry} from "@nestjs/schedule"
@Injectable()
export class ProductService {
    constructor(
        private readonly sqlService : PgDataServices,
        private readonly tableService : TableService , 
        private readonly schedulerRegistry : SchedulerRegistry,
    ){}

    async getAllProducts(){
        try{
            const projection = ["product_code", "brand_name"] 
            const mainTable = "reorderitems"
            const customQuery = `
                SELECT ${projection.join(',')} 
                FROM ${mainTable} 
            `;
        const parameters = {};
        
        const result = await this.tableService.getAllWithNoPagination(
            customQuery,
            parameters,
        );

        const everySecondJob = this.schedulerRegistry.getCronJob("logMessage")
        everySecondJob.stop()
        return result 
        }catch(e){
            return {
                message : e.message
            }
        }
    }
}