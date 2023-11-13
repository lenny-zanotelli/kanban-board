import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import multer from 'multer';
import helmet from 'helmet';

import { dataSource } from './config/data-source';
import router from './src/router';
import { notFoundMiddleware } from 'src/middlewares/notFoundMiddleware';
dotenv.config();
const multipartParsers = multer();

const app: Express = express();
const PORT = process.env.PORT || 3000;


/* -- Initialize Database with TypeOrm -- */
dataSource
.initialize()
.then(() => {
    console.log('Data Source has been initialized successfully.')
})
.catch((err) => {
  console.error('Error during Data Source initialization', err)
})

app.use(express.json());
/* ---------- Middlewares ---------- */
// Help Secure App with various HTTP headers : helmetjs.github.io/
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'use.fontawesome.com']
    },
  })
);
// Authorize Cross Origin Resource Sharing
app.use(cors());
// We dont expect any files, only 'classic' inputs
app.use(multipartParsers.none());
app.use()
app.use(router);

app.use(express.static('assets'));
app.use(notFoundMiddleware);

/* ---------- App ---------- */

app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
});