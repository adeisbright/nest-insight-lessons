import { Controller, Get  , Res} from "@nestjs/common";
import { ProductService } from "./product.service";
@Controller("products")
export class ProductController {
    constructor(
        private readonly productService : ProductService
    ){}

    @Get()
    async getProducts(
        @Res() res:any
    ){
        try{
            const response = await this.productService.getAllProducts() 
            return res.status(200).json({
                message:"Successful",
                data : response
            })
        }catch(e){
            return res.status(500).json({
                message:e.message
            })
        }
    }
}