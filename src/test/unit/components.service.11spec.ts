import { Test } from '@nestjs/testing';
import { ComponentsService } from '../../src/components/components.service';
import { VersionsService } from '../../src/versions/versions.service';
import { VersionsRepository } from '../../src/versions/versions.repository';
import { ComponentsRepository } from '../../src/components/components.repository';
import { Components } from '../../src/components/dto/components.entity';
import { crawlerTimeConfig } from '../../src/components/dto/crawlerTime.enum';
import { CreateComponentDto } from '../../src/components/dto/create-components-dto';

const mockComponentsService = () => ({
  //ESTO ES LO QUE SE RECIBE ----------------------------------------------------|
  getAllComponent: () => [
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
      versionCode: '\t1.0.9',
      versionDate: '2022-07-07T18:10:40.000Z',
      componentStatus: true,
    },
  ],
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
      versionCode: '\t1.0.9',
      versionDate: '2022-07-07T18:10:40.000Z',
      componentStatus: true,
    },
  ],
  updateVersion: () => [
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
      versionCode: '\t1.0.9',
      versionDate: '2022-07-07T18:10:40.000Z',
      componentStatus: true,
    },
  ],
  updateCrawlerLastCheck: () => [
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
      versionCode: '\t1.0.9',
      versionDate: '2022-07-07T18:10:40.000Z',
      componentStatus: true,
    },
  ],
  create: () => [
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
      versionCode: '\t1.0.9',
      versionDate: '2022-07-07T18:10:40.000Z',
      componentStatus: true,
    },
  ],
});

describe('componentService', () => {
  let componentService: ComponentsService;
  //INICIALIZAMOS LOS MODULOS
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VersionsService,
        VersionsRepository,
        ComponentsRepository,
        Components,
        CreateComponentDto,
        ComponentsRepository,
        { provide: ComponentsService, useFactory: mockComponentsService },
      ],
    }).compile();
    componentService = module.get(ComponentsService);
  });
  describe('test of component service', () => {
    //esto es lo que se espera  ----------------------------------------------------|
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
        versionCode: '\t1.0.9',
        versionDate: '2022-07-07T18:10:40.000Z',
        componentStatus: true,
      },
    ];
    it('test of getAllComponent in component service module', () => {
      expect(componentService.getAllComponent()).toEqual(components);
    });
    it('test of getComponentByTypeCrawler in component service ', () => {
      expect(
        componentService.getComponentByTypeCrawler(crawlerTimeConfig.ONEHOUR),
      ).toEqual(components);
    });
    it('test of updateVersion in component service ', () => {
      const componentID = '2d3ea7aa-d899-4a00-b74d-6465adc4d0c2';
      const versionCode = '\t1.0.9';
      expect(componentService.updateVersion(componentID, versionCode)).toEqual(
        components,
      );
    });
    it('test of updateCrawlerLastCheck in component service ', () => {
      let component: Components;
      expect(componentService.updateCrawlerLastCheck(component)).toEqual(
        components,
      );
    });
    it('test of create in component service ', () => {
      let CreateComponentDto: CreateComponentDto;
      let componentsRepository: ComponentsRepository;
      const version = '\t1.0.9';
      expect(componentService.create(CreateComponentDto, version)).toEqual(
        components,
      );
      // expect( componentsRepository.createComponent( CreateComponentDto, version)).toEqual(components);
    });
  });
});
