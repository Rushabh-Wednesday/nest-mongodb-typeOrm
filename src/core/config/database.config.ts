import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { getEnv } from '../utils/common.util';
const connection = {
  type: getEnv('DB_DIALECT'),
  host: getEnv('DATABASE_HOST'),
  port: parseInt(getEnv('DATABASE_PORT')),
  username: getEnv('DATABASE_USERNAME'),
  password: getEnv('DATABASE_PASSWORD'),
  database: getEnv('DATABASE_NAME'),
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../../**', '*.entity{.ts,.js}')],
} as TypeOrmModuleOptions;

export default () => connection;
