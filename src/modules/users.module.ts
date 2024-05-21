import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "src/controllers/users.controller";
import { LoggerMiddleware } from "src/middlewares/logger";
import { UserService } from "src/services/users.service";

@Module({
    imports:[],
    controllers:[UserController],
    providers:[UserService]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users')
    }
};