import { Controller, Get , UseGuards , Param, ParseIntPipe } from "@nestjs/common";
import { PUBLIC } from "../auth/public";


@Controller("users")

export class UserController {
    constructor(
    ){}

    // @UseGuards(JwtAuthGuard)
    @PUBLIC()
    @Get(":id")
    async handleLogin(@Param("id" , ParseIntPipe) id : number){
        return {
            message : `Working on User Data for ${id}`
        }
    }

}