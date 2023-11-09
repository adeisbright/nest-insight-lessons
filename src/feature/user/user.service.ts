import { MysqlDataServices } from "@/datasource/mysql/database/database.service";
import { Injectable } from "@nestjs/common";
import { User } from "@/datasource/mysql/entities/User";
import { ElasticsearchService } from "@nestjs/elasticsearch";
@Injectable() 
export class UserService {
   
    constructor(
        private readonly sqlService : MysqlDataServices ,
        private readonly elasticService : ElasticsearchService
    ){}

    async getUsers(){
        const query = {}
        const users = await this.sqlService.users.getAll(query,User , ["record.email" , "record.id"]) 
        console.log(users) 
        return users 
    }

    async search(q: string) {
        try{
            const doc = {
                fields : ["description" , "name"] , 
                query : q , 
                fuzziness : "auto" , 
                operator : "and"
            }
            // const data = await this.elasticService.search({
            //     index : "io" ,  
            //     body : {
            //        query : {
            //         multi_match : doc
            //        }
            //     }
            // })
            const data = await this.elasticService.indices.exists({index : "bis"})
            console.log(data)
            return {
                data : data, 
                message : "Ok"
            }
        }catch(e){
            return e
        }
    }
}