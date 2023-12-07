import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from '../configuration/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/secret';
import { CategoryModule } from './category.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN_SEC}s`
            }
        }),
        UserModule,
        CategoryModule,
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig)
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
