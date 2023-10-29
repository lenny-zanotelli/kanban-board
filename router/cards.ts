import express from 'express';
const router = express.Router();

// IMPORT CONTROLLER
import cardController from '../src/controllers/cardController';

/** CARDS */

router.get('/lists/:id/cards', cardController.getCardsInList);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.put('/cards/:id', cardController.modifyCard);
router.delete('/cards/:id', cardController.deleteCard)

export default router;