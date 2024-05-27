import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserBodyDto } from 'src/dtos/userBody.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { UsersDbService } from 'src/services/users-db.service';
import { UserService } from 'src/services/users.service';

//* host/path
//*     /segmento1/segmento2/segmento3

//* host/users
@Controller('users')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService, private readonly userDbService: UsersDbService) {}

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

  //? ParseUUID
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userDbService.getUserById(id);

    if(!user) throw new NotFoundException('Usuario no encontrado')
    return user
  }

  // ? ValidationPipe local
  // @Get(':id')
  // @UsePipes(new ValidationPipe({transform:true}))
  // getUserById(@Param('id') id: number) {
    
  //   console.log(typeof id);
  //   return `Este es el id de usuario ${id}`
    
    // return this.userDbService.getUserById(id);
  // }

  //* request = { now: 23/5/2024, ... }
  @Put()
  @UseInterceptors(DateAdderInterceptor)
  updateUser(@Body() user: any, @Req() request: Request & { now: string }) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.userService.createUser(modifiedUser);
  }

  @Post()
  createUser(@Body() user: UserBodyDto, @Req() request:Request  & { now: string }) {
    const modifiedUser = { ...user, createdAt: request.now  };
    return this.userDbService.create(modifiedUser)
  }

  @Delete()
  deleteUser() {
    // return 'Esta ruta elimina un usuario';
    try {
      throw Error()
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.I_AM_A_TEAPOT,
        error:"Envío de cafecito fallido"
      }, HttpStatus.I_AM_A_TEAPOT)
    }
  }
}
