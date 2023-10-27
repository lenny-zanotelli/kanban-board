import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEPORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/entities/*.ts'],
  synchronize: true, //do not use in prod
  logging: ['query', 'error']

});