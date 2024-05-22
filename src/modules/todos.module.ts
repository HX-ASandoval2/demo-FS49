import { Module } from "@nestjs/common";
import { TodoController } from "src/controllers/todos.controller";
import { TodoRepository } from "src/repositories/todos.repository";
import { TodoService } from "src/services/todos.service";


const ACCESS = 'EstaEsMiSuperClaveSecreta'

@Module({
    imports:[],
    controllers:[TodoController],
    // providers:[TodoService, TodoRepository]
    providers:[{
        provide:"ACCESS_TOKEN",
        useValue:ACCESS
    },
    TodoService,
    TodoRepository
]
})
export class TodosModule{};