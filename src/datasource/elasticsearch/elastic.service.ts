import { Injectable } from '@nestjs/common';
import { ElasticsearchService ,  } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

    async search(q: string) {
        try{
            
            await this.esService.indices.exists({index : "bis"})
            return {
                data : true , 
                message : "Ok"
            }
        }catch(e){
            return e
        }
    }
}