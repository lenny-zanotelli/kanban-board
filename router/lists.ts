import express from 'express';
const router = express.Router();
// IMPORT CONTROLLER
import listController from '../src/controllers/listController';

/** ROUTE OF LISTS */

router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.put('/lists/:id', listController.modifyList);
router.post('/lists', listController.createList);
router.delete('/lists/:id', listController.deleteList);

export default router;