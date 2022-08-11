import { Repository } from 'typeorm';
import { CustomRepository } from '../databaseCustomRepository/typeorm-ex.decorator';
import { CreateProductDto } from './dto/create-products-dto';
import { Products } from './products.entity';

@CustomRepository(Products)
export class ProductsRepository extends Repository<Products> {
  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    const { productName, productCreateUser, productStatus } = createProductDto;
    const productCreateDate = new Date();
    const productUpdateDate = new Date();
    const productUpdateUser = productCreateUser;

    const product = this.create({
      productName,
      productCreateUser,
      productCreateDate,
      productUpdateDate,
      productUpdateUser,
      productStatus,
    });

    await this.save(product);
    return product;
  }
}
