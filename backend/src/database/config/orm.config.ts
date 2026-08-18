import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('POSTGRES_HOST'),
    port: config.get<number>('POSTGRES_PORT'),
    username: config.get<string>('POSTGRES_USER'),
    password: config.get<string>('POSTGRES_PASSWORD'),
    database: config.get<string>('POSTGRES_DATABASE'),
    entities: [join(__dirname, '..', '..', '**', '*.entity.{js,ts}')],
    migrations: [join(__dirname, '..', 'migrations', '*.{js,ts}')],

    logging: false,
    migrationsRun: false,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  async dataSourceFactory(options) {
    if (!options) throw new Error('Invalid options passed');
    return Promise.resolve(addTransactionalDataSource(new DataSource(options)));
  },
};
