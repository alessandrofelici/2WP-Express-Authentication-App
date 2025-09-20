const express = require('express');
import { getAllContacts, getById, deleteById, addNewContacts } from '../controllers/contactController';

const contactRouter = express.Router();

contactRouter.get('/', getAllContacts);
contactRouter.get('/:id', getById);
contactRouter.post('/delete/:id', deleteById);
contactRouter.post('/add', addNewContacts);

export default contactRouter;