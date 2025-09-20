const express = require('express');
import { getAllUsers, getById } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getById);

export default userRouter;