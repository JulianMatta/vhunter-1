import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const dataResponse = [
    'productID',
    'productName',
    'productCreateDate',
    'productCreateUser',
    'productUpdateDate',
    'productUpdateUser',
    'productStatus',
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //jest.setTimeout(20000);
  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        if (!result.body[0]) {
        } else {
          expect(Object.keys(result.body[0])).toEqual(dataResponse);
        }
      });
  });

  it('/products/:id (GET)', async () => {
    const productID = await request(app.getHttpServer())
      .get('/products')
      .then((result) => {
        const idFound = result.body[0].productID;
        return idFound;
      });

    return request(app.getHttpServer())
      .get('/products/' + productID)
      .then((result) => {
        expect(result.statusCode).toBe(200);
        if (!result.body[0]) {
        } else {
          expect(Object.keys(result.body[0])).toEqual(dataResponse);
        }
      });
  });

  it('/products (POST)', async () => {
    const product = {
      productName: 'REFLOWCONJWT',
      productCreateUser: 'Juan',
      productStatus: true,
    };
    const credenciales = {
      username: 'front',
      password: 'admin123',
    };
    const accessToken = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(credenciales)
      .then((result) => {
        const accessToken = result.body.accessToken;
        return accessToken;
      });
    return request(app.getHttpServer())
      .post('/products')
      .set({
        Authorization: 'Bearer ' + accessToken,
      })
      .send(product)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });
});
