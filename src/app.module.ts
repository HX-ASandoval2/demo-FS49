import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { TodosModule } from './modules/todos.module';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [AppController],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: DateAdderInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
