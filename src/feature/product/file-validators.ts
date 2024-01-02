import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

export const FileValidators = [
  new MaxFileSizeValidator({
    maxSize: 1000,
    message: 'File Size should be 1mb',
  }),
  new FileTypeValidator({ fileType: 'image/jpeg' }),
];
