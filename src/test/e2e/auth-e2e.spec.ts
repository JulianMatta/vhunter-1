import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signin (POST) ', () => {
    const credenciales = {
      username: 'front',
      password: 'admin123',
    };

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(credenciales)
      .then((result) => {
        const accessToken = result.body.accessToken;
        console.log(accessToken);
        expect(result.statusCode).toEqual(201);
      });
  });
  /* ESTARIA GENERANDO NUEVOS USUARIOS
  it('/auth/signup (POST) ', () => {
    const credenciales = {
      username: 'juan',
      password: 'juan123',
    };

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(credenciales)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });
*/
  afterAll(async () => {
    await app.close();
  });
});
