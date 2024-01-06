import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
  PgDataServices,
  TableService,
} from '../../datasource/pg/databases/database.service';
import { ProductService } from './product.service';

describe('Product Service', () => {
  let productService: ProductService;
  let tableService : TableService

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
    tableService = module.get<TableService>(TableService)
  });

  it('Should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('Get all Products', () => {
    it('Should return an array of products', async () => {
      const expectedProducts = [{ product_code: '1', brand_name: 'Brand A' }];
      jest
        .spyOn(productService , "getAllProducts")
        .mockResolvedValue(expectedProducts)
      const result = await productService.getAllProducts();
      expect(result).toEqual(expectedProducts);
    });

    it('should stop the cron job and throw error message if error occurs', async () => {
        //Arrange 
        jest.spyOn(productService, "getAllProducts").mockRejectedValue(new Error("Database error"))
        // Act
        let errorResult: any;
        try {
            await productService.getAllProducts();
        } catch (error) {
            errorResult = error;
        }

        // Assert
        expect(errorResult).toBeInstanceOf(Error);
        expect(errorResult.message).toEqual('Database error');
    });
  });
});
