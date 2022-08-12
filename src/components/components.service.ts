import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentsRepository } from './components.repository';
import { Components } from './dto/components.entity';
import { crawlerTimeConfig } from './dto/crawlerTime.enum';
import { CreateComponentDto } from './dto/create-components-dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(ComponentsRepository)
    private componentsRepository: ComponentsRepository,
  ) {}
  private readonly logger = new Logger(ComponentsService.name);

  create(
    createComponentDto: CreateComponentDto,
    version: string,
  ): Promise<Components> {
    return this.componentsRepository.createComponent(
      createComponentDto,
      version,
    );
  }

  async getAllComponent(): Promise<Components[]> {
    const found = await this.componentsRepository.find();
    if (!found) {
      throw new NotFoundException(`PRODUCTS 'NOT FOUND`);
    }
    return found;
  }

  async getComponentByTypeCrawler(
    crawlerTime: crawlerTimeConfig,
  ): Promise<Components[]> {
    const found = await this.componentsRepository.find({
      where: { crawlerTime },
    });
    if (!found) {
      throw new NotFoundException(`COMPONENTS TYPE 'NOT FOUND`);
    }
    return found;
  }

  async updateVersion(componentID: string, versionCode: string) {
    try {
      return await this.componentsRepository.update(componentID, {
        versionDate: new Date(),
        versionCode,
      });
    } catch (error) {
      this.logger.debug(error);
    }
  }

  async updateCrawlerLastCheck(component: Components) {
    try {
      return await this.componentsRepository.update(component, {
        crawlerLastCheck: new Date(),
      });
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
