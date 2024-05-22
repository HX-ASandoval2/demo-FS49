import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/services/users.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}
    
    @Get()
    getUsers():any[]{
        return this.userService.getUsers()
    }
}