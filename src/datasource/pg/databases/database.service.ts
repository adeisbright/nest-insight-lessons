import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  FindOptionsWhere,
  ObjectLiteral,
  ObjectType,
  Repository,
} from 'typeorm';
import { Product } from '../entities/product';
import { REPOSITORY } from '@/constants';
import { IOrderBy } from '@/shared/interfaces';
import { DataSource } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract getAll(
    query: FindOptionsWhere<T>,
    model: ObjectType<T>,
    projection: any,
  ): Promise<T>;
}

export class PgGenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  private readonly _repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAll(
    query: FindOptionsWhere<T>,
    model: ObjectType<T>,
    projection: any,
  ): Promise<T> {
    const queryBuilder: any = this._repository
      .createQueryBuilder()
      .addSelect(projection)
      .from(model, 'record')
      .where(query)
      .getOne();

    return queryBuilder;
  }
}

export abstract class PgDataServices {
  abstract products: IGenericRepository<Product>;
}

@Injectable()
export class SqlService implements PgDataServices, OnApplicationBootstrap {
  products: PgGenericRepository<Product>;

  constructor(
    @Inject(REPOSITORY) private userRepository: Repository<Product>,
  ) {}

  onApplicationBootstrap() {
    this.products = new PgGenericRepository<Product>(this.userRepository);
  }
}

@Injectable()
export class TableService {
  constructor(@Inject(REPOSITORY) private repository: DataSource) {}

  getAll(
    query: Record<string, any>,
    tableName: string,
    projection: string[],
    orderBy: IOrderBy,
    limit: number = 10,
    offset: number = 0,
  ) {
    return this.repository
      .createQueryBuilder()
      .orderBy(orderBy.sortString, orderBy.order)
      .take(limit)
      .skip(offset)
      .select(projection)
      .from(tableName, 'record')
      .where(query)
      .getRawMany();
  }

  count(query: Record<string, any>, tableName: string): Promise<number> {
    return this.repository
      .createQueryBuilder()
      .from(tableName, 'record')
      .where(query)
      .getCount();
  }

  getArchivedTableName(tableName: string, archivedDate: Date) {
    const month = archivedDate.getMonth() + 1;
    const year = archivedDate.getFullYear();
    let stringnifyMonth = `${month}`;
    if (month < 10) {
      stringnifyMonth = `0${month}`;
    }
    return `${tableName}_${year}_${stringnifyMonth}`;
  }
  getAllWithRawQuery(
    customQuery: string,
    parameters: Record<string, any>,
    limit: number = 10,
    skip: number = 0,
  ) {
    const chain = this.repository.createQueryBuilder().skip(skip).take(limit);
    for (const [key, value] of Object.entries(parameters)) {
      chain.setParameter(key, value);
    }
    return chain.from(`(${customQuery})`, 'record').getRawMany();
  }

  getAllWithNoPagination(customQuery: string, parameters: Record<string, any>) {
    const chain = this.repository.createQueryBuilder();
    for (const [key, value] of Object.entries(parameters)) {
      chain.setParameter(key, value);
    }
    return chain.from(`(${customQuery})`, 'record').getRawMany();
  }
}
