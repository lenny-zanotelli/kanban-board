import express from 'express';
// Controllers import
import listsRouter from '../router/lists';
import cardsRouter from '../router/cards';
import tagsRouter from '../router/tags';

const router = express.Router();

// router.get('/', (_req: Request, res: Response) => {
//   let filePath = path.join(__dirname, "../../assets/index.html")
//   res.sendFile(filePath);
// });

router.use('/', listsRouter, cardsRouter, tagsRouter);

export default router;