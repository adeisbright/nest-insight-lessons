import { Injectable } from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter"

@Injectable()
export class EmailTask {
    @OnEvent("email.drop")
    async processEmail(){
        console.log("Processing Email Dropped within last 30 seconds ")
    }
}