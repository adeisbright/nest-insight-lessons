import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class QueueProducer {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addToQueue() {
    try {
      await this.audioQueue.add({
        name: 'Adeleke Bright',
        age: 29,
        skills: ['Backend', 'Devops', 'Data Science', 'ML', 'Product'],
      });
    } catch (e) {
      console.log(e);
    }
  }
}
