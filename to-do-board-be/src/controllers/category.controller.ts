import { Controller, Logger, Post, Body } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SignupCommand } from '../commands/signup.command';
import { UserService } from '../services/user.service';
import { CommonResponse } from '../response-model/common.model';
import { LoginCommand } from '../commands/login.command';
import { LoginResponse } from '../response-model/login.model';
import { RefreshTokenCommand } from '../commands/refresh.token.command';
import { CategoryCommand } from '../commands/category.command';
import { CategoryService } from 'src/services/category.service';

@Controller('category')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);
    constructor(private readonly categoryService: CategoryService) {}

    @Post('/create')
    async create(@Body() command: CategoryCommand): Promise<CommonResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} create category started.`);

        const res = await this.categoryService.create(command, "string", correlationId);
        this.logger.log(`${correlationId} create category ended.`);
        return res;
    }

    // @Post('/login')
    // async login(@Body() command: LoginCommand): Promise<LoginResponse> {
    //     const correlationId: string = randomUUID();
    //     this.logger.log(`${correlationId} login started.`);

    //     const res = await this.userService.login(command, correlationId);
    //     this.logger.log(`${correlationId} login ended.`);
    //     return res;
    // }

    // @Post('/refresh-token')
    // async refreshToken(
    //     @Body() command: RefreshTokenCommand
    // ): Promise<LoginResponse> {
    //     const correlationId: string = randomUUID();
    //     this.logger.log(`${correlationId} refreshToken started.`);

    //     const res = await this.userService.refreshToken(command, correlationId);
    //     this.logger.log(`${correlationId} refreshToken ended.`);
    //     return res;
    // }
}
