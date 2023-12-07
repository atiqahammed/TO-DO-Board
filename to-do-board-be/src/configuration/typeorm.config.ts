import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions
} from '@nestjs/typeorm';
import DBUser from '../database/entity/db-user.entity';
import DBCategory from '../database/entity/db-category.entity';
import DBTask from '../database/entity/db-task.entity';
import DBTaskHistory from '../database/entity/db-task-history.entity';

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
        entities: [DBUser, DBCategory, DBTask, DBTaskHistory],
        synchronize: process.env.DATABASE_SYNC ? true : false,
        logging: true,
        migrationsRun: true,
        keepConnectionAlive: true
    };
}
