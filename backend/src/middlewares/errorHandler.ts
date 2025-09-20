import { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("ErrorHandler intercepted: ", error);

  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    const duplicate = error.message.includes("email")
    ? "Email"
    : "Username"
    return void res.status(400).json({ error: `${duplicate} has already existed` });
  }

  if (error.name === "CastError") {
    return void res.status(400).json({ error: `Invalid id` });
  }

  next(error);
};

export default errorHandler;