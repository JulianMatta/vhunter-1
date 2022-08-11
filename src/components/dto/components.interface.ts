import { ComponentTypeStatus } from './componentType.enum';
import { crawlerTimeConfig } from './crawlerTime.enum';

export interface ComponentInterface {
    productID: string;
    componentName: string;
    componentType: ComponentTypeStatus;
    versionURL: string;
    releaseURL: string;
    crawlerTime: crawlerTimeConfig;
    componentCreateUser: string;
    componentUpdateUser: string;
    componentStatus: boolean;
    versionCode: string;
    versionDate: Date;
}