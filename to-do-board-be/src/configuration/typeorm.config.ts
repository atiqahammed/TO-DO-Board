import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions
} from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return await getOrmConfig();
    }
};

export async function getOrmConfig(): Promise<TypeOrmModuleOptions> {
    return {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [DBUser],
        synchronize: process.env.DATABASE_SYNC ? true : false,
        logging: true,
        migrationsRun: true,
        keepConnectionAlive: true
    };
}
