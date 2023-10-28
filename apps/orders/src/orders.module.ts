import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from '@app/common/database/prisma.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import config from 'libs/common/config';
import { PrismaService, RMQModule } from '@app/common';
import { BILLING_SERVICE } from './constant';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    RMQModule.register({ name: BILLING_SERVICE }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
