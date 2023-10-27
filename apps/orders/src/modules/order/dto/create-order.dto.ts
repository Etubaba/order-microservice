import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  phone: string;
}
