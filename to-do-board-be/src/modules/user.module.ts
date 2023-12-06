import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import DBUser from '../database/entity/db-user.entity';
import { UserService } from '../services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([DBUser])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
