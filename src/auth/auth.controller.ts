import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExistingUserDto } from 'src/dto/existingUser.dto';
import { UserDto } from 'src/dto/newUser.dto';
import { LocalGuard } from 'src/guards/local.guard';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AllExceptionsFilter } from 'src/filter/all.exception.filter';
import { JwtGuard } from 'src/guards/jwt.guard';
import { Route } from 'src/constants/constants';

// use it for filter
// @Catch()
// export class DatabaseErrorFilter extends BaseExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     if (exception.code === 'DATABASE_ERROR_CODE') {
//       throw new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//     super.catch(exception, host);
//   }
// }


@UseFilters(AllExceptionsFilter)
@Controller(Route.entry)
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe()) 
    @UseInterceptors(ClassSerializerInterceptor)
    @Post(Route.signup)
    async signup (
        @Body() newUser: UserDto 
    ) : Promise<UserDto> {      
         return await this.authService.register(newUser);
    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalGuard)
    @UsePipes(new ValidationPipe())
    @Post(Route.signIn)
    async signin (
        @Body () existingUser : ExistingUserDto,
        @Res ({ passthrough : true }) response : Response
    ) : Promise<{ token :  string }> {
         return await this.authService.login(existingUser); 
    }

    @UseGuards(JwtGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getData (
        @Req() request : Request
    ) : Promise<UserDto> {
        return this.authService.getUserData(request['user']);
    }
}


