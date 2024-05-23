import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { UserService } from 'src/services/users.service';

//* host/path
//*     /segmento1/segmento2/segmento3

//* host/users
@Controller('users')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('name') name: string) {
    if (name) {
      return this.userService.getUserByName(name);
    }
    return this.userService.getUsers();
  }

  //* GET /users/prifile
  @Get('profile')
  getProfile(@Headers('token') token: string) {
    if (!token) {
      return 'Se necesita un token!';
    }
    if (token !== 'ValidToken') {
      return 'Token inválido!';
    }
    return 'Perfil del usuario';
  }

  // @UseGuards(AuthGuard)
  @Get('profile/images')
  getImages() {
    return 'Imágenes del usuario';
  }

  //* GET /users/coffee
  @HttpCode(418)
  @Get('coffee')
  getCoffee() {
    return 'No hay café en esta ruta, soy una tetera';
  }

  //* GET /users/message
  @Get('message')
  getMessage(
    @Res() response: Response,
    @Req() request: Request & { now: string },
  ) {
    response.status(202).json({
      message: 'Se aceptó la solicitud: Mensaje...',
      data: request.now,
    });
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    console.log(request);
    return 'Esta ruta imprime el request por consola';
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  //* request = { now: 23/5/2024, ... }
  @Post()
  @UseInterceptors(DateAdderInterceptor)
  updateUser(@Body() user: any, @Req() request: Request & { now: string }) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.userService.createUser(modifiedUser);
  }

  @Put()
  createUser() {
    return 'Esta ruta crea un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Esta ruta elimina un usuario';
  }
}
