import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { S3Helper } from './aws-s3-helper';
import { appConfig } from '@/config';
import { FileSizeValidationPipe } from './file.pipe';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});

@Controller('products')
export class ProductController {
  private awsBucket: string;
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Helper,
  ) {
    this.awsBucket = appConfig.aws.bucketName;
  }

  @Get()
  async getProducts(@Res() res: any) {
    try {
      const response = await this.productService.getAllProducts();
      return res.status(200).json({
        message: 'Successful',
        data: response,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('attachment'))
  async uploadProduct(
    @Res() res: any,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Body() body: any,
  ) {
    try {
      const { originalname, buffer } = file;
      const imgResponse = await this.s3Service.putObject(originalname, buffer);
      if (imgResponse?.$metadata.httpStatusCode !== 200) {
        throw new BadRequestException('Unable to upload the file');
      }
      const response = await this.productService.addProduct(body);
      return res.status(200).json({
        message: 'Successful',
        data: {
          response,
          url: `https://${this.awsBucket}.s3.amazonaws.com/${originalname}`,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  }

  @Post('/nnn')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async addProduct(
    @Res() res: any,
    @UploadedFile() // new ParseFilePipe({
    //     validators : [
    file //         new MaxFileSizeValidator({maxSize : 5000}),
    //         new FileTypeValidator({fileType : "image/png"})
    //     ]
    // })
    : Express.Multer.File,
    @Body() body: any,
  ) {
    try {
      const response = await this.productService.addProduct(body);
      return res.status(200).json({
        message: 'Successful',
        data: response,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  }
}
