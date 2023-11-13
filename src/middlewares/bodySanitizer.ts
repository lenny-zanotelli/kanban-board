import { NextFunction, Request, Response } from 'express';
import sanitizer from 'sanitizer';

export const bodySanitizer = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    for (let propName in req.body) {
      req.body[propName] = sanitizer.escape(req.body[propName])
    }
  }
  next();
}