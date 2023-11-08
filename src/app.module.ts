import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './datasource/mysql/database/database.module';
import { RequestLabeller } from './middleware/request-label';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal :  true
    }),
    FeatureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  async configure(consumer : MiddlewareConsumer){
    consumer.apply(RequestLabeller)
    .forRoutes({path : "" , method : RequestMethod.GET})
  }
}
