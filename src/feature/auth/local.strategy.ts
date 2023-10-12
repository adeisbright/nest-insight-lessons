import { PassportStrategy } from "@nestjs/passport"; 
import { Strategy } from "passport-local";
import { Injectable , UnauthorizedException } from "@nestjs/common"; 
import { AuthService } from "./auth.service"; 

@Injectable() 
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService : AuthService
    ){
        super()
    }

    async validate(username : string , password : string){
        console.log("Did it reach here")
        const user = this.authService.validate({username , password}) 
        if (!user){
            throw new UnauthorizedException()
        }
        return user 
    }
}