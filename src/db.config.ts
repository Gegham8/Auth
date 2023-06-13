import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
require('dotenv').config();

export const configService : TypeOrmModule = {
    type : 'mysql',
    host : process.env.MYSQL_HOST,
    port : parseInt(process.env.MYSQL_PORT),
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    entities : [User],
    synchronize : true,

}