import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productCreateUser: string;

  @IsNotEmpty()
  @IsBoolean()
  productStatus: boolean;
}
