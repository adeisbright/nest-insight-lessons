import { MysqlDataServices } from "@/datasource/mysql/database/database.service";
import { Injectable } from "@nestjs/common";
import { User } from "@/datasource/mysql/entities/User";
@Injectable() 
export class UserService {
   
    constructor(
        private readonly sqlService : MysqlDataServices ,
    ){}

    async getUsers(){
        const query = {}
        const users = await this.sqlService.users.getAll(query,User , ["record.email" , "record.id"]) 
        console.log(users) 
        return users 
    }
}