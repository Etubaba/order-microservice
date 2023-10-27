import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  order_app: {
    port: parseInt(process.env.ORDER_PORT, 10) || 3000,
  },

  rabbitMQ: {
    RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
    RABBIT_MQ_BILLING_QUEUE: process.env.RABBIT_MQ_BILLING_QUEUE,
  },
});
