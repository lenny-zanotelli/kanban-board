import express, { Request, Response} from 'express';
// Controllers import
import listsRouter from '../router/lists';
import cardsRouter from '../router/cards';
import tagsRouter from '../router/tags';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Test server')
});

router.use('/', listsRouter, cardsRouter, tagsRouter);

export default router;