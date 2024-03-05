import { Module, NestModule } from "@nestjs/common";
import { ClientsModule, Transport  } from "@nestjs/microservices";
import { TCPService } from "./TCP.service";
import { TCPController } from "./TCP.controller";

@Module({
    imports :[
        ClientsModule.register([
            {
                name : "Wallet_Service" , 
                transport : Transport.TCP , 
                options : {
                    port : 3002
                }
            }
        ])
    ],
    providers : [TCPService],
    controllers : [TCPController]
})

export class TCPModule {}
