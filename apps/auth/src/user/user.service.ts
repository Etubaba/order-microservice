import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { PrismaService } from '@app/common';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async registerUser(registerDto: LoginDto) {
    const { phone, password } = registerDto;

    const userExist = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (userExist) {
      throw new BadRequestException('Credentials in use');
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.prismaService.user.create({
      data: {
        phone,
        password: hashedPassword,
      },
    });

    return { message: 'User created ', user };
  }
}
