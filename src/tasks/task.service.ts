import { Injectable } from "@nestjs/common";
import {Cron , CronExpression} from "@nestjs/schedule"
import { LAGOS_TIMEZONE } from "@/constants";
import {EventEmitter2} from "@nestjs/event-emitter"
@Injectable() 
export class TaskService {
    constructor(
        private readonly eventEmitter : EventEmitter2
    ){} 
    @Cron(CronExpression.EVERY_30_SECONDS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    }) 
    runEverySecond(){
        this.eventEmitter.emit("email.drop")
    }

    @Cron(CronExpression.EVERY_MINUTE) 
    runEveryMinute(){
        console.log(`Every Minute Message, Now is ${new Date()}`)
    }

    @Cron("2 * * * *") 
    runEverySecondMinute(){
        console.log("Every Two minute Message")
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT , {
        timeZone : LAGOS_TIMEZONE
    }) 
    runMidnight(){
        console.log(`Run at midnight, Now is ${new Date()}`)
    }

    @Cron(CronExpression.EVERY_30_MINUTES , {
        timeZone : LAGOS_TIMEZONE
    }) 
    runThirtyMinutes(){
        console.log(`Every 30 minutes, Now is ${new Date()}`)
    }

    @Cron(CronExpression.EVERY_DAY_AT_6PM , {
        timeZone : LAGOS_TIMEZONE
    }) 
    runAtSixAM(){
        console.log(`Every Day at Six AM, Now is ${new Date()}`)
    }
}