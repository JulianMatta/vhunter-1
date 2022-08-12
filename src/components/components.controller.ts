import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ScrapperService } from '../scrapper/scrapper.service';
import { ComponentsService } from './components.service';
import { Components } from './dto/components.entity';
import { CreateComponentDto } from './dto/create-components-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('components')
export class ComponentsController {
  constructor(
    private componentService: ComponentsService,
    private scrapperService: ScrapperService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createComponentDto: CreateComponentDto) {
    const version = await this.scrapperService.selectorComponentType(
      createComponentDto.versionURL,
      createComponentDto.componentType,
    );
    return this.componentService.create(createComponentDto, version.toString());
  }

  @Get('/')
  async getAllComponents(): Promise<Components[]> {
    return await this.componentService.getAllComponent();
  }
}
