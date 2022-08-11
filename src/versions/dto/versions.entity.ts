import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Versions {
  @PrimaryGeneratedColumn('uuid')
  versionID: string;
  @Column()
  componentID: string;
  @Column()
  productID: string;
  @Column()
  versionCode: string;
  @Column()
  versionDate: Date;
}
