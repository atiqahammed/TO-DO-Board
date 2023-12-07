import {
    Controller,
    Logger,
    Post,
    Body,
    UseGuards,
    Request,
    Get
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CommonResponse } from '../response-model/common.model';
import { CategoryCommand } from '../commands/category.command';
import { CategoryService } from '../services/category.service';
import { AuthGuard } from '../configuration/auth.guard';
import { CategoryResponse } from '../response-model/category.model';

@Controller('category')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    async create(
        @Request() req,
        @Body() command: CategoryCommand
    ): Promise<CommonResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} create category started.`);

        const res = await this.categoryService.create(
            command,
            req.user?.email,
            correlationId
        );
        this.logger.log(`${correlationId} create category ended.`);
        return res;
    }

    @UseGuards(AuthGuard)
    @Get('/get')
    async get(@Request() req): Promise<CategoryResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} get category started.`);

        const res = await this.categoryService.get(
            req.user?.email,
            correlationId
        );
        this.logger.log(`${correlationId} get category ended.`);
        return res;
    }
}
