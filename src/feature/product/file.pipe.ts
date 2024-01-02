import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, _: ArgumentMetadata) {
    const oneKb = 1000;
    const acceptableFileTypes = ['image/jpg' , 'image/jpeg', 'image/png' , 'image/gif'];
    const fileType = value.mimetype 
    const fileSize = value.size 
    if (!acceptableFileTypes.includes(fileType)) {
      throw new BadRequestException(
        `The File type ${fileType} is not acceptable`,
      );
    }
    if (fileSize > oneKb) {
      throw new BadRequestException('The File Size is too large');
    }
    return true;
  }
}
