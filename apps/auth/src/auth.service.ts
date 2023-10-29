import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const { phone, password } = loginDto;

    //check if user credential is valid
    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const correctPass = await argon2.verify(user.password, password);

    if (!correctPass) {
      throw new NotAcceptableException(`User password is incorrect`);
    }

    const token = await this.jwtService.signAsync(
      {
        phone,
        sub: user.id,
      },
      {
        secret: this.configService.get('jwt.jwt_secret'),
        expiresIn: this.configService.get('jwt.expires_in'),
      },
    );

    res.cookie('Auth', token, {
      httpOnly: true,
      expires: new Date(),
    });

    res.send(user);
    //return { status: true, user };
  }
}
