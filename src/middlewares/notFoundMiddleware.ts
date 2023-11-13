import { Response, Request } from "express";

export function notFoundMiddleware(_req: Request, res: Response) {
  res.status(404).send('Service does not exists\nCheck API docs for correct routes')
};
