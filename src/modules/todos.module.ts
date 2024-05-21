import { Module } from "@nestjs/common";
import { TodoController } from "src/controllers/todos.controller";
import { TodoService } from "src/services/todos.service";

@Module({
    imports:[],
    controllers:[TodoController],
    providers:[TodoService]
})
export class TodosModule{};