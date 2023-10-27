import express, { Request, Response} from 'express';
// Controllers import
import listController from '../src/controllers/listController';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('TEst server')
});

router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.put('/lists/:id', listController.modifyList);
router.post('/lists', listController.createList);
router.delete('/lists/:id', listController.deleteList);

export default router;