import { Module } from '@nestjs/common';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { elasticConfig } from './elastic.config';
import { SearchService } from './elastic.service';
import { SearchController } from './elastic.controller';
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: elasticConfig.node,
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
        auth: {
          username: elasticConfig.username,
          password: elasticConfig.password,
        },
      }),
    }),
  ],
  providers: [SearchService ],
  exports: [SearchService],
  controllers : [SearchController]
})

export class SearchModule{}