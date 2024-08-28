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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../decorators/roles.decorator';
import { UserBodyDto, UserSignDto } from '../dtos/userBody.dto';
import { RolesGuard } from '../guards/roles.guard';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { DataAdderInterceptor } from '../interceptors/data-adder.interceptor';
import { Role } from '../role.enum';
import { AuthService } from '../services/auth.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { UserDbService } from '../services/user-db.service';
import { UserService } from '../services/users.service';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
// @UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDBService: UserDbService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  @ApiQuery({ name: 'name', required: false })
  getUsers(@Query('name') name: string) {
    if (name) return this.userService.getByName(name);
    return this.userDBService.getUsers();
    // return this.userService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token: string) {
    if (token !== '1234') return 'Acceso denegado';
    return 'Esta ruta devuelve el perfil del usuario';
  }

  @ApiBearerAuth()
  @Get('profile/images')
  @UseGuards(UserAuthGuard)
  getProfilePics() {
    return 'Esta ruta devuelve las imágenes del perfil del usuario';
  }

  @ApiBearerAuth()
  @Get('admin')
  @Roles(Role.Admin) //* 'admin'
  @UseGuards(UserAuthGuard, RolesGuard)
  getAdmin() {
    return 'Esta es una ruta protegida';
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userDBService.getUser(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  @HttpCode(418)
  @Get('coffee')
  makeCoffee() {
    return 'No puedo preparar café, soy una tetera';
  }

  @Post()
  @UseInterceptors(DataAdderInterceptor)
  createUser(@Body() user: UserBodyDto, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.authService.signUp(modifiedUser);
  }

  @Post('signin')
  signIn(@Body() user: UserSignDto) {
    return this.authService.signIn(user.email, user.password);
  }

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
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
    return await this.cloudinaryService.uploadImage(file);
  }

  @Put()
  updateUser() {
    return 'Esta ruta actualiza un usuario';
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
