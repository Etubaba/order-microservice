import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RMQModule } from '@app/common';
import { BILLING_SERVICE } from '../../constant';

@Module({
  imports: [RMQModule.register({ name: BILLING_SERVICE })],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
