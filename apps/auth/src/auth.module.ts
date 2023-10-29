import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import configs from 'libs/common/config';
import { PrismaModule } from '@app/common/database/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RMQModule } from '@app/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    RMQModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ load: [configs], isGlobal: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
