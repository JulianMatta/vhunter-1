import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-products-dto';
import { Products } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) { }

  create(createProductDto: CreateProductDto): Promise<Products> {
    return this.productsRepository.createProduct(createProductDto);
  }
  async getProductById(productID: string): Promise<Products> {
    const found = await this.productsRepository.findOne({
      where: { productID },
    });
    if (!found) {
      throw new NotFoundException(`PRODUCTS WITH ID:'${productID}'NOT FOUND`);
    }
    return found;
  }

  async getAllProducts(): Promise<Products[]> {
    const found = await this.productsRepository.find();
    if (!found) {
      throw new NotFoundException(`PRODUCTS 'NOT FOUND`);
    }

    return found;
  }
}
