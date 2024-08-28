import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository {
  private todos = [
    {
      id: 1,
      title: 'pan',
      description: 'comprar pan',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'NestJs',
      description: 'Continuar estudiando full',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Ropa',
      description: 'Lavar la ropa',
      isCompleted: false,
    },
  ];

  getTodos() {
    return this.todos;
  }
}
