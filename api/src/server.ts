import express, { Express, Request, Response} from 'express';

const app: Express = express();
const PORT: number = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('TEst server')
});

app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
});