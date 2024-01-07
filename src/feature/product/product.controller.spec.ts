import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { S3Helper } from './aws-s3-helper';
import {
  PgDataServices,
  TableService,
} from '../../datasource/pg/databases/database.service';
import { SchedulerRegistry } from '@nestjs/schedule';

describe('Product Controller', () => {
  let app: INestApplication;
  let productService: ProductService;
  let tableService: TableService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        S3Helper,
        {
          provide: PgDataServices,
          useValue: {},
        },
        {
          provide: TableService,
          useValue: {},
        },
        {
          provide: SchedulerRegistry,
          useValue: {},
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    tableService = module.get<TableService>(TableService);

    app = module.createNestApplication();
    await app.init();
  });

  describe('/products (GET)', () => {
    it('Should return products successfully', async () => {
      const mockResponse = [{}];

      jest
        .spyOn(app.get(ProductService), 'getAllProducts')
        .mockResolvedValue(mockResponse);
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);
      expect(response.body).toEqual({
        message: 'Successful',
        data: mockResponse,
      });
    });
  });
});
