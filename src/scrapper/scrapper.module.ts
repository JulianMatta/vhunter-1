import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { TypeOrmExModule } from '../databaseCustomRepository/typeorm-ex.module';
import { VersionsRepository } from '../versions/versions.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([VersionsRepository])],
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
