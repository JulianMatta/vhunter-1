import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentsRepository } from './components.repository';
import { Components } from './dto/components.entity';
import { ComponentTypeStatus } from './dto/componentType.enum';
import { crawlerTimeConfig } from './dto/crawlerTime.enum';
import { CreateComponentDto } from './dto/create-components-dto';



@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(ComponentsRepository)
    private componentsRepository: ComponentsRepository,
  ) { }

  create(createComponentDto: CreateComponentDto, version: string): Promise<Components> {
    return this.componentsRepository.createComponent(createComponentDto, version);
  }

  async getAllComponent(): Promise<Components[]> {
    const found = await this.componentsRepository.find();
    if (!found) {
      throw new NotFoundException(`PRODUCTS 'NOT FOUND`);
    }

    return found;
  }

  async getComponentByTypeCrawler(crawlerTime: crawlerTimeConfig): Promise<Components[]> {

    const found = await this.componentsRepository.find({ where: { crawlerTime } });
    if (!found) {
      throw new NotFoundException(`COMPONENTS TYPE 'NOT FOUND`);
    }
    return found
  }

  async updateVersion(componentID: string, versionCode: string) {
    const found = await this.componentsRepository.findOne({ where: { componentID } });
    if (!found) {
      throw new NotFoundException(`COMPONENTS 'NOT FOUND`);
    }
    found.versionCode = versionCode;
    found.versionDate = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()));
    this.componentsRepository.save(found);
    return found;
  }

  async updateCrawlerLastCheck(component: Components) {
    component.crawlerLastCheck = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()));
    this.componentsRepository.save(component);
    return true;
  }
}
