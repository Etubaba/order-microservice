import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import config from 'libs/common/config';
@Module({
  imports: [
    RMQModule,
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
