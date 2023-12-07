import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import { Repository } from 'typeorm';
import { CommonResponse } from '../response-model/common.model';
import { JwtService } from '@nestjs/jwt';
import DBCategory from '../database/entity/db-category.entity';
import { CategoryCommand } from '../commands/category.command';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);
    constructor(
        @InjectRepository(DBUser)
        private userRepo: Repository<DBUser>,
        @InjectRepository(DBCategory)
        private categoryRepo: Repository<DBCategory>
    ) {}


    async create(
        command: CategoryCommand,
        email: string,
        correlationId: string
    ): Promise<CommonResponse> {
        this.logger.log(
            `${correlationId} create category initiated. email: ${email}`
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

            this.logger.log(`${correlationId} saving category.`);
            let newCategory = new DBCategory();
            newCategory.name = command.name;
            newCategory.userId = existingUser.id;

            await this.categoryRepo.save(newCategory);
            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from create category.`);
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
