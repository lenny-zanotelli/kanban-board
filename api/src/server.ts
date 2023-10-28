import 'reflect-metadata';
import express, { Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { dataSource } from '../config/data-source';
import router from '../router';
dotenv.config();

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());
// Help Secure APp with various HTTP headers : helmetjs.github.io/
app.use(helmet());
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