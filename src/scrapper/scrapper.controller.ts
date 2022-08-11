/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Query } from '@nestjs/common';
import { ScrapperService } from "./scrapper.service";

@Controller('scrapper')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) { }
  @Get('/')
  selectorComponentType(@Query('versionURL') versionURL: string, @Query('componentType') componentType: string) {
    return this.scrapperService.selectorComponentType(versionURL, componentType);
  }
}
