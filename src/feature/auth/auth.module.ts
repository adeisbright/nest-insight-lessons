import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { APP_GUARD } from "@nestjs/core";
// import { AuthGuard } from "./auth.guard";
import { UserService } from "../user/user.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Module({
    imports : [
        JwtModule.register({
            global : true,
            secret : "abc" , 
            signOptions : {
                expiresIn : "300s"
            }
        }) , 
        PassportModule
    ] , 
    providers : [
        AuthService , 
        UserService,
        {
            provide : APP_GUARD , 
            useClass : JwtAuthGuard
        } , 
        LocalStrategy,
        JwtStrategy,
    ] , 
    controllers : [AuthController],
    exports : [AuthService]

})
export class AuthModule {}