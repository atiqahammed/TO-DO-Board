import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import DBCategory from '../database/entity/db-category.entity';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([DBUser, DBCategory])],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
