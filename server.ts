import 'reflect-metadata';
import express, { Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import multer from 'multer';

import { dataSource } from './config/data-source';
import router from './router';
dotenv.config();
const upload = multer();
const app: Express = express();
const PORT = process.env.PORT || 3000;

//Initialize Database with TypeOrm
dataSource
.initialize()
.then(() => {
    console.log('Data Source has been initialized successfully.')
})
.catch((err) => {
  console.error('Error during Data Source initialization', err)
})

app.use(express.json());
// Help Secure App with various HTTP headers : helmetjs.github.io/
app.use(helmet());
// Authorize Cross Origin Resource Sharing
app.use(cors());
// We dont expect any files, only 'classic' inputs
app.use(upload.none());


app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
});