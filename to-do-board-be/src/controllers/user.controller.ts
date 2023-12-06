import { Controller, Logger, Post, Body } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SignupCommand } from '../commands/signup.command';
import { UserService } from '../services/user.service';
import { SignupResponse } from '../response-model/signup.model';
import { LoginCommand } from '../commands/login.command';
import { LoginResponse } from '../response-model/login.model';
import { RefreshTokenCommand } from '../commands/refresh.token.command';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async signup(@Body() command: SignupCommand): Promise<SignupResponse> {
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
