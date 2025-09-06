import { Request, Response, NextFunction } from 'express';
import '@shared/types';

const modifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    // delete 'Bearer ' and add new field 'token'
    // @ts-ignore
    req.token = authorization.substring(7);
  }

  // @ts-ignore
  console.log(req.token);
  next();
}

export default modifyToken;