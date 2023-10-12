import { Controller, Get , Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req : any): Record<string,any> {
    const requestId = req.headers["id"]
    const responseData = this.appService.getHello()
    return {
      id : requestId , 
      data : responseData
    }
  }
}
