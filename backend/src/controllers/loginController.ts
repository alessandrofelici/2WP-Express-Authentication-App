const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { Request, Response, NextFunction } from "express";
import { User } from '../models/index';
import config from '../config';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, String(user!.passwordHash)))) {
    return void res.status(401).send({ err: "Invalid credentials" });
  }

  const payload = {
    username: user.username,
    name: user.name,
    id: user._id
  };

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: 60*60 });

  return void res.status(200).send({ token });
}