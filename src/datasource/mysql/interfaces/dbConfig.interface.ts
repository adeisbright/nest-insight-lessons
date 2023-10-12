import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface IDatabaseConfig {
    development : MysqlConnectionOptions ;
    production : MysqlConnectionOptions
}