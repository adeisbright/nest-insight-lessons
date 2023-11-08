import { DataSource } from 'typeorm';
import { DATA_SOURCE, REPOSITORY } from '@/constants';

export const mysqlProvider = [
  {
    provide: REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource,
    inject: [DATA_SOURCE],
  },
];
