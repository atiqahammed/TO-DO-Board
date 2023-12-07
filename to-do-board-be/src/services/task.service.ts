import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import { Repository } from 'typeorm';
import { CommonResponse } from '../response-model/common.model';
import DBCategory from '../database/entity/db-category.entity';
import DBTask from 'src/database/entity/db-task.entity';
import DBTaskHistory from 'src/database/entity/db-task-history.entity';
import { TaskCommand } from 'src/commands/task.command';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor(
        @InjectRepository(DBUser)
        private userRepo: Repository<DBUser>,
        @InjectRepository(DBCategory)
        private categoryRepo: Repository<DBCategory>,
        @InjectRepository(DBTask)
        private taskRepo: Repository<DBTask>,
        @InjectRepository(DBTaskHistory)
        private taskHistoryRepo: Repository<DBTaskHistory>
    ) {}

    async create(
        command: TaskCommand,
        email: string,
        correlationId: string
    ): Promise<CommonResponse> {
        this.logger.log(
            `${correlationId} create task initiated. email: ${email}`
        );

        let response: CommonResponse = {};

        try {
            this.logger.log(`${correlationId} checking user.`);
            const existingUser = await this.userRepo.findOne({
                where: {
                    email: email
                }
            });
            if (!(existingUser && existingUser.id)) {
                this.logger.warn(`${correlationId} user not found.`);
                response.errorMessage = 'INVALID_REQUEST';
                response.isSuccess = false;
                return response;
            }

            const categoryResult = await this.categoryRepo.find({
                where: {
                    userId: existingUser.id
                }
            });
            this.logger.log(`${correlationId} checking category.`);
            const category = categoryResult.find(
                (item) => item.id == command.categoryId
            );
            if (!category || !category.id) {
                this.logger.warn(`${correlationId} category not found.`);
                response.errorMessage = 'INVALID_REQUEST';
                response.isSuccess = false;
                return response;
            }

            this.logger.log(`${correlationId} saving Task.`);
            let newTask = new DBTask();
            newTask.title = command.title;
            newTask.description = command.description;
            newTask.expiryDate = command.expiryDate;
            newTask.categoryId = command.categoryId;

            await this.taskRepo.save(newTask);
            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from create task.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    // async get(
    //     email: string,
    //     correlationId: string
    // ): Promise<CategoryResponse> {
    //     this.logger.log(
    //         `${correlationId} get category initiated. email: ${email}`
    //     );

    //     let response: CategoryResponse = {};

    //     try {
    //         this.logger.log(`${correlationId} checking user.`);
    //         const existingUser = await this.userRepo.findOne({
    //             where: {
    //                 email: email
    //             }
    //         });

    //         if (!(existingUser && existingUser.id)) {
    //             this.logger.warn(`${correlationId} user not found.`);
    //             response.errorMessage = 'INVALID_REQUEST';
    //             response.isSuccess = false;
    //             return response;
    //         }

    //         this.logger.log(`${correlationId} getting category.`);

    //         const result = await this.categoryRepo.find({where: {
    //             userId: existingUser.id
    //         }});

    //         response.categoryList = result.map(item => {
    //             return {
    //                 name: item.name,
    //                 id: item.id
    //             }
    //         });
    //         response.isSuccess = true;
    //         response.message = 'SUCCESS';

    //         this.logger.log(`${correlationId} returning from get category.`);
    //         return response;
    //     } catch (err) {
    //         const errorMessage = `${correlationId} error found ${err.message}`;
    //         this.logger.error(`${correlationId} error found ${err.message}`);
    //         response.errorMessage = errorMessage;
    //         response.isSuccess = false;
    //         return response;
    //     }
    // }
}
