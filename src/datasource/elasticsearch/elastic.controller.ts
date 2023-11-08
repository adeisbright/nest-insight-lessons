import { Controller, Get, Query, Res } from '@nestjs/common';
import { SearchService } from './elastic.service';

@Controller("search") 
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getHello(@Res() res : any , @Query('q') q: string) {
    try{
        let result = await this.searchService.search(q);
        res.status(200).json({
            message : "Hello" , 
            data : result
        })
    }catch(error){
        res.status(500).json({
            message : "Hello" , 
            data : error
        })
    }
  }
}