import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserBodyDto } from 'src/dtos/userBody.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { MinSizeValidationPipe } from 'src/pipes/MinSizeValidator.pipes';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { UsersDbService } from 'src/services/users-db.service';
import { UserService } from 'src/services/users.service';

//* host/path
//*     /segmento1/segmento2/segmento3

//* host/users
@Controller('users')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDbService: UsersDbService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
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
  createUser(
    @Body() user: UserBodyDto,
    @Req() request: Request & { now: string },
  ) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.userDbService.create(modifiedUser);
  }

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidationPipe)
  async uploadProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo debe ser menor a 100kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // console.log(file);

    return await this.cloudinaryService.uploadImage(file);
  }

  @Delete()
  deleteUser() {
    // return 'Esta ruta elimina un usuario';
    try {
      throw Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Envío de cafecito fallido',
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }
}
