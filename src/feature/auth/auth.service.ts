import { Injectable } from "@nestjs/common";
import { LoginDTO } from "./login.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService : UserService ,
        private jwtService : JwtService
    ){}
    getAuth(){
        return {
            data : "Still Pending"
        }
    }

    async validate(LoginDTO : LoginDTO){
        try{
            console.log("E reach here")
            const {username } = LoginDTO
            return await this.userService.findOne(username)
        }catch(e){
            throw new Error(e)
        }
    }

    async login(user : any){
        const payload = {
            username : user.username , 
            sub : user.id 
        }
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}