import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { RMQService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RMQService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context); //acknowledge to take off queue
  }
}
