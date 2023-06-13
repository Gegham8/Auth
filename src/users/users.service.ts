import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "src/dto/newUser.dto";
import { ExistingUserDto } from "src/dto/existingUser.dto";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAlreadyExists } from "src/exceptions/user.already.exists";

@Injectable()
export class UserService {
        constructor (
            @InjectRepository(User) private readonly userRepository: Repository<User>
        ) {}
    
        async findById (id : number) : Promise<UserDto> {
            return await this.userRepository.findOne({
                where : { id },
            })
        }

        async findByEmail (email : string) : Promise<User> {
            return await this.userRepository.findOne({
                where : { email }
            });
        }

        public async createUser (
            name : string,
            email : string,
            hashedPassword : string
        ): Promise<UserDto> {     
            const user = await this.userRepository.findOne({
                where : { email }
            });
            if (user) {
                throw new UserAlreadyExists();
            }
            const newUser =  this.userRepository.create({
                name,
                email,
                password : hashedPassword
            });
    
            const createdUser =  await this.userRepository.save(newUser);
            if (createdUser && createdUser.id) {
                return createdUser;
            }
            throw new HttpException('Error to save User', HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

