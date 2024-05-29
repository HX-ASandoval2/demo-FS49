import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserBodyDto {
    id: string;
    createdAt?: string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    @Length(4,15)
    password:string

    @IsBoolean()
    isAdmin: boolean

}

export class UserSignDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    @Length(4,15)
    password: string

}