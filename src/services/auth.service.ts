import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  //? Proceso de registro del usuario
  async signUp(user: User) {
    const findUser = await this.userService.findByEmail(user.email);

    if (findUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('Password could not be hashed');

    this.userService.create({ ...user, password: hashedPassword });

    return 'User created successfully';

    // return newUser
  }

  // ? Proceso de inicio de sesión del usuario
  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('Invalid Credentias');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentias');

    const userPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      message: 'User logged in successfully',
      token,
    };
  }
}
