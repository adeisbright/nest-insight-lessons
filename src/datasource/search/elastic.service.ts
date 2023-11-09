import { Injectable } from '@nestjs/common';
import { ElasticsearchService ,  } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

    async search(q: string) {
        try{
            const doc = {
                fields : ["description" , "name"] , 
                query : q , 
                fuzziness : "auto" , 
                operator : "and"
            }
            const data = await this.esService.search({
                index : "io" ,  
                body : {
                   query : {
                    multi_match : doc
                   }
                }
            })
            console.log(data)
            return {
                data : data, 
                message : "Ok"
            }
        }catch(e){
            return e
        }
    }
}