import {
    Controller,
    Logger,
    Post,
    Body,
    UseGuards,
    Get,
    Request
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SignupCommand } from '../commands/signup.command';
import { UserService } from '../services/user.service';
import { CommonResponse } from '../response-model/common.model';
import { LoginCommand } from '../commands/login.command';
import { LoginResponse } from '../response-model/login.model';
import { RefreshTokenCommand } from '../commands/refresh.token.command';
import { AuthGuard } from 'src/configuration/auth.guard';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async signup(@Body() command: SignupCommand): Promise<CommonResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} signup started.`);

        const res = await this.userService.signup(command, correlationId);
        this.logger.log(`${correlationId} signup ended.`);
        return res;
    }

    @Post('/login')
    async login(@Body() command: LoginCommand): Promise<LoginResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} login started.`);

        const res = await this.userService.login(command, correlationId);
        this.logger.log(`${correlationId} login ended.`);
        return res;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('/refresh-token')
    async refreshToken(
        @Body() command: RefreshTokenCommand
    ): Promise<LoginResponse> {
        const correlationId: string = randomUUID();
        this.logger.log(`${correlationId} refreshToken started.`);

        const res = await this.userService.refreshToken(command, correlationId);
        this.logger.log(`${correlationId} refreshToken ended.`);
        return res;
    }
}
