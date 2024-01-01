import { Injectable } from "@nestjs/common";
import {Cron , CronExpression} from "@nestjs/schedule"
import { LAGOS_TIMEZONE } from "@/constants";
import {EventEmitter2} from "@nestjs/event-emitter"
@Injectable() 
export class TaskService {
    constructor(
        private readonly eventEmitter : EventEmitter2
    ){} 
    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    }) 
    runEverySecond(){
        //this.eventEmitter.emit("email.scan")
        this.eventEmitter.emit("email.drop")
    }

    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    })  
    runEveryMinute(){
        console.log(`Every Minute Message, Now is ${new Date()}`)
    }

    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    })  
    runEverySecondMinute(){
        console.log("Every Two minute Message")
    }

    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    })  
    runMidnight(){
        console.log(`Run at midnight, Now is ${new Date()}`)
        
    }

    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    })  
    runThirtyMinutes(){
        console.log(`Every 30 minutes, Now is ${new Date()}`)
    }

    @Cron(CronExpression.EVERY_7_HOURS , {
        timeZone : LAGOS_TIMEZONE,
        name : "logMessage"
    })  
    runAtSixAM(){
        console.log(`Every Day at Six AM, Now is ${new Date()}`)
    }
}