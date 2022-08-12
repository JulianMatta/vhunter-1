import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-versions-dto';
import { Versions } from './dto/versions.entity';
import { VersionsService } from './versions.service';

@Controller('versions')
export class VersionsController {
  constructor(private versionsService: VersionsService) {}
  /* @Post()
  create(@Body() createVersionDto: CreateVersionDto) {
    return this.versionsService.create(createVersionDto);
  }
*/
  @Get('/')
  getAllVersions(): Promise<Versions[]> {
    return this.versionsService.getAllVersions();
  }

  @Get('/lastVersion/:componentID')
  getLastVersion(
    @Param('componentID') componentID: string,
  ): Promise<{ versionCode: string; versionDate: Date }> {
    return this.versionsService.getLastVersionAndDate(componentID);
  }
}
