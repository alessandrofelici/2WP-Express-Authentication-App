import { Contact, User } from "../models";
import { Request, Response, NextFunction } from "express";

export const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  const contacts = await Contact.find({}).populate("belongsTo", { username: 1, name: 1 });
  res.json(contacts);
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  }
  catch (err) {
    next(err);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;

  if (!userId) return void res.status(401).send({ error: "Authentication required" });

  const user = await User.findById(userId);
  if (!user) return void res.status(400).send({ error: "User not found" });

  try {
    await Contact.findByIdAndDelete(req.params.id);
    user.contacts = user.contacts.filter(c => c.toString() != req.params.id);
    res.status(204).end();
  }
  catch (err) {
    next(err);
  }
};


export const addNewContacts = async (req: Request, res: Response, next: NextFunction) => {
  const { name, number } = req.body;
  const userId = req.user.id;

  if (!userId) return void res.status(401).send({ error: "invalid token" });

  if (!name) {
    return void res.status(400).send({ error: "Name is required" });
  }
  if (!number) {
    return void res.status(400).send({ error: "Number is required" });
  }

  const user = await User.findById(userId);
  if (!user) return void res.status(400).send({ error: "missing userId/invalid" });

  const contact = new Contact({
    name,
    number,
    belongsTo: userId
  });

  console.log("ok");

  try {
    const savedContact = await contact.save();
    user.contacts = user.contacts.concat(savedContact._id);

    res.status(201).json(savedContact);
    await user.save();
  }
  catch (err) {
    next(err);
  }
};