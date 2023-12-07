import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import DBCategory from '../database/entity/db-category.entity';
import DBTask from '../database/entity/db-task.entity';
import DBTaskHistory from '../database/entity/db-task-history.entity';
import { TaskController } from '../controllers/item.controller';
import { TaskService } from '../services/task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DBUser, DBCategory, DBTask, DBTaskHistory])
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
