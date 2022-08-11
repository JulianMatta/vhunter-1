import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/databaseCustomRepository/typeorm-ex.module';
import { ScrapperService } from 'src/scrapper/scrapper.service';
import { VersionsRepository } from 'src/versions/versions.repository';
import { ComponentsController } from './components.controller';
import { ComponentsRepository } from './components.repository';
import { ComponentsService } from './components.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ComponentsRepository, VersionsRepository])],
  controllers: [ComponentsController],
  providers: [ComponentsService, ScrapperService],
})
export class ComponentsModule { }
