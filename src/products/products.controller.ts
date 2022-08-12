import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-products-dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }
  @Get('/')
  getAllProducts(): Promise<Products[]> {
    return this.productsService.getAllProducts();
  }
}
