import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserBodyDto {
    id: string;
    createdAt?: string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsBoolean()
    isAdmin: boolean

}