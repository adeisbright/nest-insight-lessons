import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  constructor() {}

  @Process()
  handleAudio(job: Job<unknown>) {
    console.log(job);
  }
}
