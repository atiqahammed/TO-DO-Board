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
import { AuthGuard } from '../configuration/auth.guard';
import { TaskCommand } from '../commands/task.command';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    async create(
        @Request() req,
        @Body() command: TaskCommand
    ): Promise<CommonResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} create task started.`);

        const res = await this.taskService.create(
            command,
            req.user?.email,
            correlationId
        );
        this.logger.log(`${correlationId} create task ended.`);
        return res;
    }

    @UseGuards(AuthGuard)
    @Post('/update')
    async update(
        @Request() req,
        @Body() command: TaskCommand
    ): Promise<CommonResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} update task started.`);

        const res = await this.taskService.update(
            command,
            req.user?.email,
            correlationId
        );
        this.logger.log(`${correlationId} update task ended.`);
        return res;
    }

    // @UseGuards(AuthGuard)
    // @Get('/get')
    // async get(@Request() req): Promise<CategoryResponse> {
    //     const correlationId: string = randomUUID();
    //     this.logger.log(`${correlationId} get category started.`);

    //     const res = await this.categoryService.get(req.user?.email, correlationId);
    //     this.logger.log(`${correlationId} get category ended.`);
    //     return res;
    // }
}
