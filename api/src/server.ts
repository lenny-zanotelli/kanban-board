import 'reflect-metadata';
import express, { Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dataSource } from '../config/data-source';
dotenv.config();


const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('TEst server')
});

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