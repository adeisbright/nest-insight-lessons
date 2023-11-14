import { Injectable } from "@nestjs/common";
import { PgDataServices,TableService } from "@/datasource/pg/databases/database.service";
import { Product } from "@/datasource/pg/entities/product";
@Injectable()
export class ProductService {
    constructor(
        private readonly sqlService : PgDataServices,
        private readonly tableService : TableService
    ){}

    async getAllProducts(){
        try{
            const projection = ["product_code"] 
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
        return result 
        }catch(e){
            return {
                message : e.message
            }
        }
    }
}