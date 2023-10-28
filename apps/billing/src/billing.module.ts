import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from 'libs/common/config';
@Module({
  imports: [
    RMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
    // ConfigModule.forRoot({ load: [config], isGlobal: true }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
