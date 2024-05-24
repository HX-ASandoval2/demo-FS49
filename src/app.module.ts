import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { TodosModule } from './modules/todos.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import { UsersDbService } from './services/users-db.service';

import typeOrmConfig from './config/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
     inject: [ConfigService],
     useFactory:(configService: ConfigService) => configService.get('typeorm')
    }),
    UsersModule,
    TodosModule],
  controllers: [AppController],
  // providers: [AppService],
  providers:[{
    provide: AppService,
    useClass:AppService
  },
  // {
  //   provide:APP_GUARD,
  //   useClass: UsersAuthGuard
  // },
  {
    provide:APP_INTERCEPTOR,
    useClass: DateAdderInterceptor
  },
  UsersDbService
]
})
export class AppModule {}