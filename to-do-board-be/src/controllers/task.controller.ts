import {
    Controller,
    Logger,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CommonResponse } from '../response-model/common.model';
import { AuthGuard } from '../configuration/auth.guard';
import { TaskCommand } from '../commands/task.command';
import { TaskService } from '../services/task.service';
import { TaskResponse } from 'src/response-model/task.model';

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

    @UseGuards(AuthGuard)
    @Get('/get')
    async get(@Request() req): Promise<TaskResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} get task started.`);

        const res = await this.taskService.get(req.user?.email, correlationId);
        this.logger.log(`${correlationId} get task ended.`);
        return res;
    }

    @UseGuards(AuthGuard)
    @Get('/get/history/:id')
    async getHistory(@Request() req, @Param('id') id): Promise<TaskResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} get category started.`);
        this.logger.log(`${correlationId} id ${id}`);

        const res = await this.taskService.getHistory(
            id,
            req.user?.email,
            correlationId
        );
        this.logger.log(`${correlationId} get category ended.`);
        return res;
    }
}
