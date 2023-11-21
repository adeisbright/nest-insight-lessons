import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './datasource/mysql/database/database.module';
import { RequestLabeller } from './middleware/request-label';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { FeatureModule } from './feature/feature.module';
import { SearchModule } from './datasource/search/elastic.module';
import { SocketModule } from './socket/socket.module';
import {ScheduleModule} from "@nestjs/schedule"
import { TaskService } from './tasks/task.service';
import { EmailTask } from './tasks/email.task';
import {EventEmitterModule} from "@nestjs/event-emitter"
import {BullModule} from "@nestjs/bull"
import { bullConfig } from './config';
import { QueueModule } from './queue/queue.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal :  true
    }),
    FeatureModule ,
    SocketModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    BullModule.forRoot(bullConfig),
    QueueModule
  ],
  controllers: [AppController],
  providers: [AppService,TaskService , EmailTask],
})
export class AppModule implements NestModule {
  async configure(consumer : MiddlewareConsumer){
    consumer.apply(RequestLabeller)
    .forRoutes({path : "" , method : RequestMethod.GET})
  }
}
