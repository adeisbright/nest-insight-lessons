import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
@Injectable()
export class EmailTask {
  constructor(private readonly mailService: MailerService) {}
  @OnEvent('email.drop')
  async processEmail() {
    console.log('Processing Email Dropped within last 30 seconds ');
    await this.mailService.sendMail({
      to: 'adenababanla@gmail.com',
      from: 'adenababanla@gmail.com',
      template: path.join(__dirname, '../templates/' + 'index'),
      context: {
        name: 'Adeleke Ipenko Bright',
      },
    });
  }
}
