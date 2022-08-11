import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/databaseCustomRepository/typeorm-ex.module';
import { VersionsController } from './versions.controller';
import { VersionsRepository } from './versions.repository';
import { VersionsService } from './versions.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([VersionsRepository])],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
