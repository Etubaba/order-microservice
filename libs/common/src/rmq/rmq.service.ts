import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, RmqContext } from '@nestjs/microservices';

@Injectable()
export class RMQService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck: boolean = false) {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBIT_MQ_URI')],
        queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  //function that takes message off the queue when it is received successfully
  //acknowledge message and take off queue
  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();
    channel.ack(msg);
  }
}
