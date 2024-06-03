import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TodoService } from '../services/todos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(): any {
    return this.todoService.getTodos();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.todoService.saveFile(
      file.originalname,
      file.mimetype,
      file.buffer,
    );
    return 'Archivo guardado';
  }
}
