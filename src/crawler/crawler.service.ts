import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ComponentsService } from '../components/components.service';
import { Components } from '../components/dto/components.entity';
import { crawlerTimeConfig } from '../components/dto/crawlerTime.enum';
import { ScrapperService } from '../scrapper/scrapper.service';
import { CreateVersionDto } from '../versions/dto/create-versions-dto';
import { VersionsService } from '../versions/versions.service';

@Injectable()
export class CrawlerService {
  constructor(
    private scrapperService: ScrapperService,
    private componentService: ComponentsService,
    private versionService: VersionsService,
  ) {}
  private readonly logger = new Logger(CrawlerService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async executeCron() {
    this.logger.debug('Mensaje de inicio ONEHOUR ---------------');
    const components = await this.componentService.getComponentByTypeCrawler(
      crawlerTimeConfig.ONEHOUR,
    );
    this.getVersionEachComponent(components);
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async executeCron2() {
    this.logger.debug('Mensaje de inicio THREEHOUR ---------------');
    const components = await this.componentService.getComponentByTypeCrawler(
      crawlerTimeConfig.THREEHOUR,
    );
    this.getVersionEachComponent(components);
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async executeCron3() {
    this.logger.debug('Mensaje de inicio SIXHOUR ---------------');
    const components = await this.componentService.getComponentByTypeCrawler(
      crawlerTimeConfig.SIXHOUR,
    );
    this.getVersionEachComponent(components);
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async executeCron4() {
    this.logger.debug('Mensaje de inicio ONEDAY ---------------');
    const components = await this.componentService.getComponentByTypeCrawler(
      crawlerTimeConfig.ONEDAY,
    );
    this.getVersionEachComponent(components);
  }

  async getVersionEachComponent(components: Components[]) {
    let newVersion: CreateVersionDto;
    let newVersionCode: string;
    let versionDB: string;
    for (const component of components) {
      await this.componentService.updateCrawlerLastCheck(component);
      switch (component.componentType) {
        case 'WEB':
          newVersionCode = await this.scrapperService.WebPublic(
            component.versionURL,
          );
          newVersion = {
            componentID: component.componentID,
            productID: component.productID,
            versionCode: newVersionCode,
          };
          versionDB = await this.versionService.getLastVersion(
            component.componentID,
          );
          if (versionDB.length == 0 || newVersionCode != versionDB) {
            const p1 = this.versionService.create(newVersion);
            const p2 = this.componentService.updateVersion(
              component.componentID,
              newVersionCode,
            );
            Promise.all([p1, p2])
              .then(() => {
                this.logger.debug(`version web guardada`);
              })
              .catch(() => {
                this.logger.debug(`error al guardar version web`);
              });
          } else {
            this.logger.debug(`version web no guardada`);
          }
          break;

        case 'PLAYSTORE':
          newVersionCode = await this.scrapperService.PlayStoreGoogle(
            component.versionURL,
          );
          newVersion = {
            componentID: component.componentID,
            productID: component.productID,
            versionCode: newVersionCode,
          };
          versionDB = await this.versionService.getLastVersion(
            component.componentID,
          );
          if (versionDB.length == 0 || newVersionCode != versionDB) {
            const p1 = this.versionService.create(newVersion);
            const p2 = this.componentService.updateVersion(
              component.componentID,
              newVersionCode,
            );
            Promise.all([p1, p2])
              .then(() => {
                this.logger.debug(`version playstore guardada`);
              })
              .catch(() => {
                this.logger.debug(`error al guardar version playstore`);
              });
          } else {
            this.logger.debug(`version playstore no guardada`);
          }
          break;

        default:
          this.logger.error('Error of component type');
          break;
      }
    }
  }
}
