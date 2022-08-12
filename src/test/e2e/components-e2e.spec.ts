import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const dataResponse = [
    'componentID',
    'productID',
    'componentName',
    'componentType',
    'versionURL',
    'releaseURL',
    'crawlerTime',
    'crawlerLastCheck',
    'componentCreateDate',
    'componentCreateUser',
    'componentUpdateDate',
    'componentUpdateUser',
    'versionCode',
    'versionDate',
    'componentStatus',
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  jest.setTimeout(20000);
  it('/components (GET)', () => {
    return request(app.getHttpServer())
      .get('/components')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        if (!result.body[0]) {
        } else {
          expect(Object.keys(result.body[0])).toEqual(dataResponse);
        }
      });
  });

  it('/components (POST) ', () => {
    const component = {
      productID: '930808ab-89fe-4cb9-873c-67b238174e5b',
      componentName: 'VhunterTestingComponent',
      componentType: 'WEB',
      versionURL: 'https://vhunter2022.herokuapp.com/vhunter',
      releaseURL: 'URLrelease',
      crawlerTime: 'ONEHOUR',
      componentCreateUser: 'ADMIN',
      componentUpdateUser: 'ADMIN',
      componentStatus: true,
    };

    return request(app.getHttpServer())
      .post('/components')
      .send(component)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
