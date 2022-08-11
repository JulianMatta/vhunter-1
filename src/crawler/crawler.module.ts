import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { TypeOrmExModule } from 'src/databaseCustomRepository/typeorm-ex.module';
import { VersionsRepository } from '../versions/versions.repository';
import { CrawlerController } from './crawler.controller';
import { ScrapperService } from 'src/scrapper/scrapper.service';
import { ComponentsService } from 'src/components/components.service';
import { VersionsService } from 'src/versions/versions.service';
import { ComponentsRepository } from 'src/components/components.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([VersionsRepository]), TypeOrmExModule.forCustomRepository([ComponentsRepository])],
  providers: [CrawlerService, ScrapperService, ComponentsService, VersionsService],
  controllers: [CrawlerController],
})
export class CrawlerModule { }
