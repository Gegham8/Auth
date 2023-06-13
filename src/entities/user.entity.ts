import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id : number;

    @Column({ type : 'varchar' })
    @IsNotEmpty({ message : 'Name is required' })
    name : string;

    @Column({ type : 'varchar', unique : true })
    @IsNotEmpty({ message : 'Email is required' })
    @IsEmail()
    email : string;
    
    @Exclude()
    @Column({ type : 'varchar' })
    @IsNotEmpty({ message : 'Password is required' })
    @IsString({ message : 'Password must be a string' })
    @MinLength(6)
    password : string

    // serialize user information
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}