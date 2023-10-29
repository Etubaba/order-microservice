import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UserService } from './user.service';

@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async registerUser(@Body() registerDto: LoginDto) {
    return await this.userService.registerUser(registerDto);
  }
}
