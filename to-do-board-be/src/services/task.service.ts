import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import { In, Repository } from 'typeorm';
import { CommonResponse } from '../response-model/common.model';
import DBCategory from '../database/entity/db-category.entity';
import DBTask from 'src/database/entity/db-task.entity';
import DBTaskHistory from 'src/database/entity/db-task-history.entity';
import { TaskCommand } from 'src/commands/task.command';
import { TaskResponse } from 'src/response-model/task.model';

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

            this.logger.log(`${correlationId} returning from update task.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    async update(
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

            this.logger.log(`${correlationId} getting Task.`);
            let result = await this.taskRepo.findOne({
                where: {
                    id: command.id
                }
            });

            if (!result || !result.id) {
                this.logger.warn(`${correlationId} task not found.`);
                response.errorMessage = 'INVALID_REQUEST';
                response.isSuccess = false;
                return response;
            }

            const previousCategoryId = result.categoryId;

            result.title = command.title;
            result.description = command.description;
            result.expiryDate = command.expiryDate;
            result.categoryId = command.categoryId;
            result.lastUpdateDate = new Date().toISOString();
            this.logger.warn(`${correlationId} task updating.`);
            await this.taskRepo.save(result);

            if (previousCategoryId != command.categoryId) {
                let newHistoryItem = new DBTaskHistory();
                newHistoryItem.categoryId = previousCategoryId;
                newHistoryItem.taskId = result.id;
                this.logger.warn(`${correlationId} task history updating.`);
                await this.taskHistoryRepo.save(newHistoryItem);
            }

            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from update task.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    async get(email: string, correlationId: string): Promise<TaskResponse> {
        this.logger.log(`${correlationId} get task initiated. email: ${email}`);

        let response: TaskResponse = {};

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

            this.logger.log(`${correlationId} getting category.`);

            const categoryResult = await this.categoryRepo.find({
                where: {
                    userId: existingUser.id
                }
            });

            const categoryIds = categoryResult.map((item) => item.id);

            const result = await this.taskRepo.find({
                where: {
                    categoryId: In(categoryIds)
                }
            });

            response.taskList = result.map((item) => {
                return {
                    title: item.title,
                    id: item.id,
                    description: item.description,
                    expiryDate: item.expiryDate,
                    categoryId: item.categoryId
                };
            });
            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from get category.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    async getHistory(
        id: string,
        email: string,
        correlationId: string
    ): Promise<TaskResponse> {
        this.logger.log(`${correlationId} get task history. id: ${id}`);

        let response: TaskResponse = {};

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

            this.logger.log(`${correlationId} getting category.`);

            const categoryResult = await this.categoryRepo.find({
                where: {
                    userId: existingUser.id
                }
            });

            const result = await this.taskHistoryRepo.find({
                where: {
                    taskId: id
                }
            });

            response.taskList = result.map((item) => {
                return {
                    id: item.taskId,
                    categoryId: item.categoryId,
                    createdAt: item.creationDate,
                    categoryName: categoryResult.find(
                        (cItem) => cItem.id == item.categoryId
                    ).name
                };
            });
            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from get category.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }
}
