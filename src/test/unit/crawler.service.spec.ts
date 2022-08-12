import { CrawlerService } from '../../crawler/crawler.service';
import { Test } from '@nestjs/testing';
import { ScrapperService } from '../../scrapper/scrapper.service';
import { ComponentsService } from '../../components/components.service';
import { VersionsService } from '../../versions/versions.service';
import { VersionsRepository } from '../../versions/versions.repository';
import { crawlerTimeConfig } from '../../components/dto/crawlerTime.enum';

const mockComponentsService = () => ({
  getComponentByTypeCrawler: () => [
    {
      componentID: '2d3ea7aa-d899-4a00-b74d-6465adc4d0c2',
      productID: 'a4582960-d985-4e60-a85b-057448a33efe',
      componentName: 'FLOWAPP',
      componentType: 'WEB',
      versionURL: 'https://web.flow.com.ar/auth/v2/revision',
      releaseURL: 'URLrelease',
      crawlerTime: 'ONEHOUR',
      crawlerLastCheck: '2022-06-29T14:43:47.000Z',
      componentCreateDate: '2022-06-29T14:43:47.000Z',
      componentCreateUser: 'EL PEPE',
      componentUpdateDate: '2022-06-29T14:43:47.000Z',
      componentUpdateUser: 'EL JUAN',
      componentStatus: true,
    },
  ],
  updateCrawlerLastCheck: () => true,
});

describe('CrawlerService', () => {
  let crawlerService: CrawlerService;
  let componentService: ComponentsService;
  //INICIALIZAMOS LOS MODULOS
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CrawlerService,
        ScrapperService,
        VersionsService,
        VersionsRepository,
        { provide: ComponentsService, useFactory: mockComponentsService },
      ],
    }).compile();
    crawlerService = module.get(CrawlerService);
    componentService = module.get(ComponentsService);
  });
  describe('getComponentByTypeCrawler', () => {
    const components = [
      {
        componentID: '2d3ea7aa-d899-4a00-b74d-6465adc4d0c2',
        productID: 'a4582960-d985-4e60-a85b-057448a33efe',
        componentName: 'FLOWAPP',
        componentType: 'WEB',
        versionURL: 'https://web.flow.com.ar/auth/v2/revision',
        releaseURL: 'URLrelease',
        crawlerTime: 'ONEHOUR',
        crawlerLastCheck: '2022-06-29T14:43:47.000Z',
        componentCreateDate: '2022-06-29T14:43:47.000Z',
        componentCreateUser: 'EL PEPE',
        componentUpdateDate: '2022-06-29T14:43:47.000Z',
        componentUpdateUser: 'EL JUAN',
        componentStatus: true,
      },
    ];
    it('test of getComponentByTypeCrawler in component service module', () => {
      expect(
        componentService.getComponentByTypeCrawler(crawlerTimeConfig.ONEHOUR),
      ).toEqual(components);
    });
  });
  describe('Test of executeCron()', () => {
    it('test of function executeCron', async () => {
      expect(await crawlerService.executeCron()).toBeUndefined();
    }, 30000);
  });
});
