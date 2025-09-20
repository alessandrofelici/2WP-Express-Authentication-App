import { Request, Response, NextFunction } from 'express';

const modifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    // delete 'Bearer' and add new field 'token'
    req.token = authorization.substring(7);
  }

  console.log(req.token);
  next();
}

export default modifyToken;