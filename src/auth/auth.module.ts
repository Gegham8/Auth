import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports : [UsersModule,
    PassportModule,
    JwtModule.registerAsync ({
      useFactory : () => ({
          secret : process.env.SECRET_KEY,
          signOptions : { expiresIn : process.env.EXPIRES_IN }
      }),
  })
],
  
  providers : [LocalStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
