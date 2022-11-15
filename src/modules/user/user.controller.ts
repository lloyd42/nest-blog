import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  UploadedFiles,
  StreamableFile,
  HttpCode,
  Header,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { PassThrough } from 'stream';

const QRCode = require('qrcode');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getfile')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), '/public/充电01.png'));
    return new StreamableFile(file);
  }
  // Response 必须为express导入
  @Get('getimage')
  @Header('Content-Type', 'image/*')
  getImage(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), '/public/充电01.png'));
    file.pipe(res);
  }

  @Get('qrcode')
  @Header('Content-Type', 'image/*')
  async generateQRCode(@Res() res: Response) {
    const url = 'www.baidu.com';
    const qrStream = new PassThrough();
    await QRCode.toFileStream(qrStream, url, {
      type: 'png',
      with: 200,
      errorCorrectionLevel: 'H',
    });

    qrStream.pipe(res);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('upload')
  // "file" 表示 上传文件的键名
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file, @Body() body) {
    //body为form/data中的其他非文件参数
    // console.log(file, body);
    const writeImage = createWriteStream(
      join(__dirname, '../../../public', `${file.originalname}`),
    );
    writeImage.write(file.buffer);
    return '上传成功';
  }

  @Post('upload/muti')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMuti(@UploadedFiles() files, @Body() body) {
    //body为form/data中的其他非文件参数
    // console.log(files, body);
    for (const file of files) {
      const writeImage = createWriteStream(
        join(__dirname, '../../../public', `${file.originalname}`),
      );
      writeImage.write(file.buffer);
    }
    return '上传成功';
  }
}
