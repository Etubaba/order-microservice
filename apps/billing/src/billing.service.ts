import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.log(data);

    //handle billing payment here

    console.log('sec=>', data);
  }
}
