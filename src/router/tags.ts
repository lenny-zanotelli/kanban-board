import express from 'express';
const router = express.Router();

import tagController from '../controllers/tagController';

/** TAGS*/

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getOneTag);
router.post('/tags', tagController.createTag);
router.put('/tags/:id', tagController.modifyTag);
router.delete('/tags/:id', tagController.deleteTag);



export default router;