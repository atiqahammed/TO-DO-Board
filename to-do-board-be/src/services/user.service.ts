import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupCommand } from '../commands/signup.command';
import DBUser from '../database/entity/db-user.entity';
import { Repository } from 'typeorm';
import { CommonResponse } from '../response-model/common.model';
import * as bcrypt from 'bcrypt';
import { LoginCommand } from '../commands/login.command';
import { LoginResponse } from '../response-model/login.model';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenCommand } from 'src/commands/refresh.token.command';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(DBUser)
        private userRepo: Repository<DBUser>,
        private jwtService: JwtService
    ) {}

    private async mapUserInformation(command: SignupCommand): Promise<DBUser> {
        let newUser = new DBUser();
        newUser.fastName = command.firstName;
        newUser.lastName = command.lastName;
        newUser.email = command.email;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(command.password, salt);
        newUser.password = hash;

        return newUser;
    }

    async signup(
        command: SignupCommand,
        correlationId: string
    ): Promise<CommonResponse> {
        this.logger.log(
            `${correlationId} signup initiated. email: ${command.email}`
        );

        let response: CommonResponse = {};

        try {
            this.logger.log(`${correlationId} checking duplicate user.`);
            const existingUser = await this.userRepo.findOne({
                where: {
                    email: command.email
                }
            });

            if (existingUser && existingUser.id) {
                this.logger.warn(`${correlationId} found duplicate user.`);
                response.errorMessage = 'USER_EXISTS';
                response.isSuccess = false;
                return response;
            }

            this.logger.log(`${correlationId} saving user.`);
            let newUser = await this.mapUserInformation(command);

            await this.userRepo.save(newUser);
            response.isSuccess = true;
            response.message = 'SUCCESS';

            this.logger.log(`${correlationId} returning from signup.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    private toTimestamp = (date: Date) => {
        const dt = date.getTime();
        return Math.floor(dt / 1000);
    };

    private async generateTokenResponse(user: DBUser): Promise<LoginResponse> {
        let response: LoginResponse = {};
        const validFrom = this.toTimestamp(new Date());
        const accessTokenExpireIn =
            validFrom + Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SEC);
        const refreshTokenExpireIn =
            validFrom + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SEC);

        const accessTokenPayload = {
            firstName: user.fastName,
            lastName: user.lastName,
            email: user.email,
            validFrom,
            validTill: accessTokenExpireIn.toString()
        };
        const accessToken = await this.jwtService.signAsync(accessTokenPayload);
        const refreshTokenPayload = {
            ...accessTokenPayload,
            accessToken,
            validTill: refreshTokenExpireIn.toString()
        };
        const refreshToken =
            await this.jwtService.signAsync(refreshTokenPayload);

        response.isSuccess = true;
        response.message = 'SUCCESS';
        response.firstName = user.fastName;
        response.lastName = user.lastName;
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;

        return response;
    }

    async login(
        command: LoginCommand,
        correlationId: string
    ): Promise<LoginResponse> {
        this.logger.log(
            `${correlationId} login initiated. email: ${command.email}`
        );

        let response: LoginResponse = {};

        try {
            this.logger.log(`${correlationId} checking user.`);
            const user = await this.userRepo.findOne({
                where: {
                    email: command.email
                }
            });

            if (!user || !user.id) {
                this.logger.warn(`${correlationId} user not found.`);
                response.errorMessage = 'INVALID_USER_CREDENTIAL';
                response.isSuccess = false;
                return response;
            }

            this.logger.log(`${correlationId} checking password.`);

            const isMatch = await bcrypt.compare(
                command.password,
                user.password
            );
            if (!isMatch) {
                this.logger.warn(`${correlationId} password not matched.`);
                response.errorMessage = 'INVALID_USER_CREDENTIAL';
                response.isSuccess = false;
                return response;
            }

            this.logger.log(`${correlationId} password matched.`);

            response = await this.generateTokenResponse(user);

            // const validFrom = this.toTimestamp(new Date());
            // const accessTokenExpireIn = validFrom + Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SEC);
            // const refreshTokenExpireIn = validFrom + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SEC);

            // const accessTokenPayload = { firstName: user.fastName, lastName: user.lastName, email: user.email, validFrom, validTill: accessTokenExpireIn.toString() };
            // const accessToken =  await this.jwtService.signAsync(accessTokenPayload);
            // const refreshTokenPayload = {
            //     ...accessTokenPayload,
            //     accessToken,
            //     validTill: refreshTokenExpireIn.toString()
            // }
            // const refreshToken =  await this.jwtService.signAsync(refreshTokenPayload);

            // response.isSuccess = true;
            // response.message = "SUCCESS";
            // response.firstName = user.fastName;
            // response.lastName = user.lastName;
            // response.accessToken = accessToken;
            // response.refreshToken = refreshToken;

            this.logger.log(`${correlationId} returning from login.`);
            return response;
        } catch (err) {
            const errorMessage = `${correlationId} error found ${err.message}`;
            this.logger.error(`${correlationId} error found ${err.message}`);
            response.errorMessage = errorMessage;
            response.isSuccess = false;
            return response;
        }
    }

    private parseJwt(token: string) {
        return JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString()
        );
    }

    async refreshToken(
        command: RefreshTokenCommand,
        correlationId: string
    ): Promise<LoginResponse> {
        this.logger.log(`${correlationId} refreshToken initiated.`);

        let response: LoginResponse = {};

        try {
            this.logger.log(`${correlationId} parse token.`);

            const tokenData = this.parseJwt(command.refreshToken);
            const validTill = Number(tokenData?.validTill);
            const currentTimestamp = this.toTimestamp(new Date());

            if (validTill < currentTimestamp) {
                this.logger.warn(`${correlationId} invalid token.`);
                response.errorMessage = 'INVALID_TOKEN';
                response.isSuccess = false;
                return response;
            }

            const user = await this.userRepo.findOne({
                where: {
                    email: tokenData?.email
                }
            });

            if (!user || !user.id) {
                this.logger.warn(`${correlationId} user not found.`);
                response.errorMessage = 'INVALID_USER_CREDENTIAL';
                response.isSuccess = false;
                return response;
            }

            response = await this.generateTokenResponse(user);

            this.logger.log(`${correlationId} returning from refreshToken.`);
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
