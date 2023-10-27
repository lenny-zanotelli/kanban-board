import 'reflect-metadata';
import express, { Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dataSource } from '../config/data-source';
import router from '../router';
dotenv.config();


const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(PORT, async () => {
  await dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized successfully.')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err)
    })
  console.log(`Server is running at : http://localhost:${PORT}`);
});