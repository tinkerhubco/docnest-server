import request = require('supertest');
import express = require('express');

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../app.module';
import { DatabaseService, DatabaseModule } from '../../database';
import { ApiModule } from '../api.module';

describe('user resolver test', () => {
  const server: express.Express = express();
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication(server);
    app.enableCors({
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true);
      }
    });
    databaseService = app
      .select(ApiModule)
      .select(DatabaseModule)
      .get(DatabaseService);

    await databaseService.reset();
    await app.init();
  });

  afterAll(async () => {
    return databaseService.disconnect();
  });

  it('should return 200 - login', () => {});
});
