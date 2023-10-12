import { Injectable } from "@nestjs/common";

@Injectable() 
export class UserService {
    private users  = [
        {
            name : "Ade",
            password : "123" , 
            id : 1
        }
    ]
    constructor(){}

    async findOne(name:string){
        return this.users.find(user => user.name === name)
    }
}