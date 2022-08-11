import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  productID: string;
  @Column()
  productName: string;
  @Column()
  productCreateDate: Date;
  @Column()
  productCreateUser: string;
  @Column()
  productUpdateDate: Date;
  @Column()
  productUpdateUser: string;
  @Column()
  productStatus: boolean;
}
