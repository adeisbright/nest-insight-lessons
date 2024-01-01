import { DataSource } from 'typeorm';
import { DATA_SOURCE, PRODUCTION } from '@/constants';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { databaseConfig } from './database.config';
import * as path from 'path';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      let config: MysqlConnectionOptions;
      switch (process.env.NODE_ENV) {
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const AppDataSource: DataSource = new DataSource({
        ...config,
        entities: [path.join(__dirname, '../entities/**/*.js')],
      });
      return AppDataSource.initialize();
    },
  },
];
