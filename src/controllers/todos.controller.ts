import { Controller, Get } from "@nestjs/common";
import { TodoService } from "src/services/todos.service";

@Controller('todos')
export class TodoController {
constructor(private readonly todoService:TodoService){}
    @Get()
    getTodos():any{
        return this.todoService.getTodos()
    }
}