import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileProcessorService } from './file-processor.service';

const storage = diskStorage({
  destination: './uploads',
  filename: (_, file, callback) =>
    callback(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (_, file, callback) => {
  if (!file.originalname.endsWith('.csv')) {
    return callback(
      new BadRequestException('Only CSV files are allowed'),
      false,
    );
  }

  return callback(null, true);
};

@Controller('file')
export class FileProcessorController {
  constructor(private readonly fileProcessorService: FileProcessorService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
  uploadFile(@UploadedFile() file) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.fileProcessorService.processFile(file.path);
  }
}
