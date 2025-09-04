const express = require('express');
import { registerUser } from '../controllers/registerController';

const registerRouter = express.Router();

registerRouter .post('/', registerUser);

export default registerRouter;