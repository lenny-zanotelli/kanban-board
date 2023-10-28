import express, { Request, Response} from 'express';
// Controllers import
import listsRouter from '../router/lists';
import cardsRouter from '../router/cards';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Test server')
});

/**LISTS */

router.use('/', listsRouter, cardsRouter);

export default router;