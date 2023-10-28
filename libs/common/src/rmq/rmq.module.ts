import { Module, DynamicModule } from '@nestjs/common';
import { RMQService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

//a rabbitmq dynamic module

@Module({
  imports: [],
  providers: [RMQService],
  exports: [RMQService],
})
export class RMQModule {
  static register({ name }: { name: string }): DynamicModule {
    return {
      module: RMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
