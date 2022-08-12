import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../databaseCustomRepository/typeorm-ex.module';
import { ScrapperService } from '../scrapper/scrapper.service';
import { VersionsRepository } from '../versions/versions.repository';
import { ComponentsController } from './components.controller';
import { ComponentsRepository } from './components.repository';
import { ComponentsService } from './components.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      ComponentsRepository,
      VersionsRepository,
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService, ScrapperService],
})
export class ComponentsModule {}
