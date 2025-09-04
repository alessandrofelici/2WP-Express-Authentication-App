const express = require('express');
import { register } from '../controllers/registerController';

const registerRouter = express.Router();

registerRouter.post('/', register);

export default registerRouter;