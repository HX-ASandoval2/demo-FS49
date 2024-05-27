import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { response } from "express";
import { UserController } from "src/controllers/users.controller";
import { User } from "src/entities/user.entity";
import { LoggerMiddleware } from "src/middlewares/logger";
import { UserRepository } from "src/repositories/users.repository";
import { UsersDbService } from "src/services/users-db.service";
import { UserService } from "src/services/users.service";

const userMockService = {
    getUsers: () => 'Este es el proveedor de servicios mock'
}

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers:[
        UserService, UserRepository, UsersDbService,
        {
            provide:"API_USERS",
            useFactory: async () => {
                const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())

                const cleanUsers = apiUsers.map((user:any)=> {
                    return {
                        id: user.id + 3,
                        name:user.name,
                        email:user.email
                    }
                })

                return cleanUsers;
            }
        }
    ],
    // providers:[{
    //     provide:UserService,
    //     useClass:UserService
    // }]
    // providers:[{
    //     provide:UserService,
    //     useValue:userMockService
    // }]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users')
    }
};