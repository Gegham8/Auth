import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './db.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath : '../.env'}),
    TypeOrmModule.forRoot(configService)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
