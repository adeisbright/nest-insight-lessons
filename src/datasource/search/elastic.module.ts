import { Module } from '@nestjs/common';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { elasticConfig } from './elastic.config';
import { SearchService } from './elastic.service';
import { SearchController } from './elastic.controller';
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: elasticConfig.node,
        auth: {
          username: elasticConfig.username,
          password: elasticConfig.password,
        },
      }),
    }),
  ],
  providers: [],
  exports: [ElasticsearchModule],
  controllers: [],
})
export class SearchModule {}
