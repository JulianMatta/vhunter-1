import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { TypeOrmExModule } from '../databaseCustomRepository/typeorm-ex.module';
import { VersionsRepository } from '../versions/versions.repository';
import { CrawlerController } from './crawler.controller';
import { ScrapperService } from '../scrapper/scrapper.service';
import { ComponentsService } from '../components/components.service';
import { VersionsService } from '../versions/versions.service';
import { ComponentsRepository } from '../components/components.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([VersionsRepository]),
    TypeOrmExModule.forCustomRepository([ComponentsRepository]),
  ],
  providers: [
    CrawlerService,
    ScrapperService,
    ComponentsService,
    VersionsService,
  ],
  controllers: [CrawlerController],
})
export class CrawlerModule {}
