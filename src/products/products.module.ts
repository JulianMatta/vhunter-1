import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../databaseCustomRepository/typeorm-ex.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProductsRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
