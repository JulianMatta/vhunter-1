import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ComponentTypeStatus } from './componentType.enum';
import { crawlerTimeConfig } from './crawlerTime.enum';

export class CreateComponentDto {
  @IsNotEmpty()
  @IsString()
  productID: string;

  @IsNotEmpty()
  @IsString()
  componentName: string;

  @IsEnum(ComponentTypeStatus)
  @IsNotEmpty()
  componentType: ComponentTypeStatus;

  @IsNotEmpty()
  @IsString()
  versionURL: string;

  @IsNotEmpty()
  @IsString()
  releaseURL: string;

  @IsEnum(crawlerTimeConfig)
  @IsNotEmpty()
  crawlerTime: crawlerTimeConfig;

  @IsNotEmpty()
  @IsString()
  componentCreateUser: string;

  @IsNotEmpty()
  @IsString()
  componentUpdateUser: string;

  @IsNotEmpty()
  @IsBoolean()
  componentStatus: boolean;
}
