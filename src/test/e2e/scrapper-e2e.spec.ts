import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Next } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  jest.setTimeout(50000);
  it('/scrapper (GET WEB)', () => {
    return request(app.getHttpServer())
      .get('/scrapper?versionURL=https://vhunter2022.herokuapp.com/vhunter&componentType=WEB')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        if (!result.text) {
        }
        else {
          expect(result.text).toContain('1.0.6');
        }
      });
  });

  it('/scrapper (GET PLAYSTORE)', () => {
    return request(app.getHttpServer())
      .get('/scrapper?versionURL=https://play.google.com/store/apps/details?id=ar.com.personalpay&hl=es_419&gl=US&componentType=PLAYSTORE')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        if (!result.text) {
        }
        else {
          expect(result.text).toContain('0.1.845');
        }
      });
  });

});
