import { Controller, Get , UseGuards , Param, ParseIntPipe, Res } from "@nestjs/common";
import { PUBLIC } from "../auth/public";
import { UserService } from "./user.service";


@Controller("users")

export class UserController {
    constructor(
        private readonly userService : UserService
    ){}
    @PUBLIC()
    @Get("/")
    async getUsers(@Res() res  :any){
        try{
            const users = await this.userService.getUsers() 
            res.status(200).json({
                data : []
            })
        }catch(error){
            res.status(error.statusCode || 500).json({
                message : error.message
            })
        }
    }

    // @UseGuards(JwtAuthGuard)
    @PUBLIC()
    @Get(":id")
    async handleLogin(@Param("id" , ParseIntPipe) id : number){
        return {
            message : `Working on User Data for ${id}`
        }
    }

}