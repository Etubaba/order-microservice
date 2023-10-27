import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../../../../../libs/common/src';
import { BILLING_SERVICE } from '../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      await lastValueFrom(
        // this function converts billing client to a promise
        this.billingClient.emit('order_created', {
          // emit order details to billing webservice
          createOrderDto,
        }),
      );
      const order = await this.prismaService.order.create({
        data: createOrderDto,
      });
      return {
        success: true,
        data: order,
      };
    } catch (err) {
      throw err;
    }
  }

  async getOrders() {
    const orders = await this.prismaService.order.findMany({});
    return { success: true, data: orders };
  }
}
