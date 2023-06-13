import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/newUser.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ExistingUserDto } from 'src/dto/existingUser.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register (user : UserDto) : Promise <UserDto> {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        const newUser = await this.userService.createUser(name, email, hashedPassword);
        return newUser;
    }

    async validateUser (email : string, password : string) : Promise<UserDto> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }
        return user;
    }

    async login (user : ExistingUserDto) : Promise< { token : string } > {
        const existingUser = await this.userService.findByEmail(user.email);
        const token = this.jwtService.sign({ id : existingUser.id }, { secret : process.env.SECRET_KEY });
        return { token : token };
    }

    async getUserData (user : User) : Promise<UserDto> {
        const existingUser = await this.userService.findById(user.id);
        return existingUser;
    }
}
