import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/services/users.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}
    
    @Get()
    getUsers():string{
        return this.userService.getUser()
    }
}