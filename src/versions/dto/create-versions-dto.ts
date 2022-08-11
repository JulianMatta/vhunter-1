import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty()
  @IsString()
  componentID: string;

  @IsNotEmpty()
  @IsString()
  productID: string;

  @IsNotEmpty()
  @IsString()
  versionCode: string;
}
