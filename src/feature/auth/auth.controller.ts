import { Controller, Post , Body  , UseGuards , Request , Req} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./login.dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { PUBLIC } from "./public";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @PUBLIC()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async handleLogin(@Request() req  :any){
        // const response = await this.authService.getAuth()
        // return {
        //     message : "Hello Auth" , 
        //     response
        // }
        return await this.authService.login(req.user)
    }

}