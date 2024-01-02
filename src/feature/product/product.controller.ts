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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
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

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('attachment', 10, { storage }))
  async uploadMultipleProduct(
    @Res() res: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    try {
      for (const file of files) {
        console.log(file.mimetype, file.originalname);
      }

      return res.status(200).json({
        message: 'Successful',
        data: {},
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  }

  @Post('/different-multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'avi',
        maxCount: 1,
      },
      {
        name: 'abi',
        maxCount: 10,
      },
    ]),
  )
  async uploadMultipleFiles(
    @Res() res: any,
    @UploadedFiles()
    files: {
      avi?: Express.Multer.File[];
      avatar?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    try {
      console.log(files);
      if (files && files.avi) {
        for (const file of files.avi as Express.Multer.File[]) {
          console.log(file.mimetype, file.originalname);
        }
      }
      if (files && files.avatar) {
        console.log('Log the Avatar File Path');
        for (const file of files.avatar as Express.Multer.File[]) {
          console.log(file.mimetype, file.originalname);
        }
      }

      return res.status(200).json({
        message: 'Successful',
        data: {},
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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
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
