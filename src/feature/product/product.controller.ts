import { Body, Controller, FileTypeValidator, Get  , MaxFileSizeValidator, ParseFilePipe, Post, Res , UploadedFile, UseInterceptors} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path"
import { diskStorage } from 'multer';
import { extname } from 'path';



const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      cb(null, `${name}-${randomName}${extension}`);
    },
  });

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

    @Post()
    @UseInterceptors(FileInterceptor("file", {storage}))
    async addProduct(
        @Res() res:any,
        @UploadedFile(
            // new ParseFilePipe({
            //     validators : [
            //         new MaxFileSizeValidator({maxSize : 5000}),
            //         new FileTypeValidator({fileType : "image/png"})
            //     ]
            // })
        ) file : Express.Multer.File,
        @Body() body : any , 
    ){
        try{
            const response = await this.productService.addProduct(body) 
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