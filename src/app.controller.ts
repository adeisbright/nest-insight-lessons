import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getWelcomeMessage(@Res() res: any) {
    return res.status(200).json(this.appService.getWelcomeMessage());
  }


  @Get("/grants")
  getGrants(@Res() res: any) {
    return res.status(200).json(this.appService.getGrants());
  }


  @Post("/grants")
  addGrant(@Res() res: any , @Body() body : any) {
    return res.status(200).json(this.appService.addGrant(body));
  }
}
