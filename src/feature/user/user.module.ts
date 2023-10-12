import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";

@Module({
    imports : [],
    providers : [AuthService , UserService],
    controllers : [UserController] , 
    exports : [UserService]
})

export class UserModule {}