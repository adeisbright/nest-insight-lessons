import { Module } from "@nestjs/common";
import {BullModule} from "@nestjs/bull"
import { QueueProducer } from "./producer";
import { AudioConsumer } from "./consumer";
@Module({
    providers:[
        QueueProducer,
        AudioConsumer
    ] , 
    imports : [
        BullModule.registerQueue(
            {
                name : "audio"
            }
        )
    ],
    exports : [QueueProducer]
})

export class QueueModule {}