import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller()
export class TCPController {
    @MessagePattern("test_event")
    async handleCreateUser(msg : Record<string,any>){
        console.log(msg)
    }
}