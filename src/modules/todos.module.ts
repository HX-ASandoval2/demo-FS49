import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoController } from "src/controllers/todos.controller";
import { File } from "src/entities/file.entity";
import { TodoRepository } from "src/repositories/todos.repository";
import { TodoService } from "src/services/todos.service";


const ACCESS = 'EstaEsMiSuperClaveSecreta'

@Module({
    imports:[TypeOrmModule.forFeature([File])],
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