import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  // IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserBodyDto {
  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  createdAt?: string;

  /**
   * Esta es la propiedad name
   * @example Blacky
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Esta es la propiedad email
   * @example blacky@example.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la propiedad password
   * @example aaBB33&&
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 15)
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserSignDto {
  /**
   * Esta es la propiedad email
   * @example blacky@example.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la propiedad password
   * @example aaBB33&&
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 15)
  password: string;
}
