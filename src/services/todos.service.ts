import { Inject, Injectable } from "@nestjs/common";
import { TodoRepository } from "src/repositories/todos.repository";

@Injectable()
export class TodoService{
    constructor(
        @Inject("ACCESS_TOKEN") private access_token: string,
        private readonly todoRepository: TodoRepository){}

    getTodos():any{
        // return this.todoRepository.getTodos()
        return this.access_token === 'EstaEsMiSuperClaveSecreta' 
             ? this.todoRepository.getTodos() 
             : "No tienes acceso a esta información"
    }
}