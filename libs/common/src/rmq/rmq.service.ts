import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class RMQService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck: boolean = false) {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('rabbitMQ.RABBIT_MQ_URI')],
        queue: this.configService.get(`rabbitMQ.RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }
}
