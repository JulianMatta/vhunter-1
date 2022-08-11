import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ComponentTypeStatus } from './componentType.enum';
import { crawlerTimeConfig } from './crawlerTime.enum';

@Entity()
export class Components {
  @PrimaryGeneratedColumn('uuid')
  componentID: string;
  @Column()
  productID: string;
  @Column()
  componentName: string;
  @Column()
  componentType: ComponentTypeStatus;
  @Column()
  versionURL: string;
  @Column()
  releaseURL: string;
  @Column()
  crawlerTime: crawlerTimeConfig;
  @Column()
  crawlerLastCheck: Date;
  @Column()
  componentCreateDate: Date;
  @Column()
  componentCreateUser: string;
  @Column()
  componentUpdateDate: Date;
  @Column()
  componentUpdateUser: string;
  @Column()
  versionCode: string;
  @Column()
  versionDate: Date;
  @Column()
  componentStatus: boolean;

}
