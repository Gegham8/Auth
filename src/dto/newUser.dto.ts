import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class UserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string'})
    name : string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: "Please enter a valid email address"})
    email : string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({message: 'Password must be a string' })
    @MinLength(6)
    password : string;
}