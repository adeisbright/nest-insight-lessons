import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { TCPModule } from './TCP.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TCPModule , 
    {
      transport : Transport.TCP , 
      options : {
        host:"127.0.0.1",
        port : 3003
      }
    }
  )
  await app.listen().then(() => console.log("Running on 3003")).catch(err => console.error(err));
}
bootstrap();
