import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  order_app: {
    port: parseInt(process.env.ORDER_PORT, 10) || 3000,
  },

  auth_app: {
    port: parseInt(process.env.AUTH_PORT, 10) || 3001,
  },

  rabbitMQ: {
    RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
    RABBIT_MQ_BILLING_QUEUE: process.env.RABBIT_MQ_BILLING_QUEUE,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_ACCEESS_EXPIRES_IN,
  },
});
