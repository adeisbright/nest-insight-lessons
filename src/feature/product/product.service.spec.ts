import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
  PgDataServices,
  TableService,
} from '../../datasource/pg/databases/database.service';
import { ProductService } from './product.service';

describe('Product Service', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
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
  });

  it('Should be defined', () => {
    expect(productService).toBeDefined();
  });
});
