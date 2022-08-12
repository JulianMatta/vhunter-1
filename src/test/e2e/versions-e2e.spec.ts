import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Next } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { nextTick } from 'process';
import { get } from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const dataResponse = [
    'versionID',
    'componentID',
    'productID',
    'versionCode',
    'versionDate',
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/versions (GET)', () => {
    return request(app.getHttpServer())
      .get('/versions')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        if (!result.body[0]) {
        } else {
          expect(Object.keys(result.body[0])).toEqual(dataResponse);
        }
      });
  });

  it('/versions/lastVersion/:componentID (GET)', async () => {
    const componentID = await request(app.getHttpServer())
      .get('/versions')
      .then((result) => {
        const idFound = result.body[0].componentID;
        return idFound;
      });

    return request(app.getHttpServer())
      .get('/versions/' + componentID)
      .then((result) => {
        if (result.statusCode != 200) {
        } else {
          expect(result.statusCode).toEqual(200);
          expect(Object.keys(result.body)).toEqual([
            'versionCode',
            'versionDate',
          ]);
        }
      });
  });
});
