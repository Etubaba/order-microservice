import { NestFactory } from '@nestjs/core';
import { RMQService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const port = configService.get('auth_app.port');
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log(`Auth server is running on port ${port}`);
  });
}
bootstrap();
