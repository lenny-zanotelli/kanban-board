import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  entities: ['src/entities/*.ts'],
  synchronize: true, //do not use in prod
  logging: ["query", "error"],
});
