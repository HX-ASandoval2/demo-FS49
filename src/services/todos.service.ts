import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { TodoRepository } from '../repositories/todos.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @Inject('ACCESS_TOKEN') private access_token: string,
    private readonly todoRepository: TodoRepository,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  getTodos(): any {
    // return this.todoRepository.getTodos()
    return this.access_token === 'EstaEsMiSuperClaveSecreta'
      ? this.todoRepository.getTodos()
      : 'No tienes acceso a esta información';
  }

  saveFile(name: string, mimeType: string, data: Buffer): Promise<File> {
    const file = new File();

    file.name = name;
    file.mymeType = mimeType;
    file.data = data;
    return this.fileRepository.save(file);
  }
}
