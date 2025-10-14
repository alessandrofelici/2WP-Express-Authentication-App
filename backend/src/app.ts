import { Request, Response } from "express";
const express = require('express');
import mongoose from "mongoose";
import config from './config';
const cors = require('cors');

import registerRouter from './routers/registerRouter';
import userRouter from "./routers/userRouter";
import loginRouter from "./routers/loginRouter";
import modifyToken from "./middlewares/modifyToken";
import { jwtAuth } from "./middlewares/jwtAuth";
import contactRouter from "./routers/contactRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Enable CORS for frontend communication
app.use(cors());

// Connect to MongoDB
console.log("connecting to ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => 
    console.log("error connecting to MongoDB: ", error.message)
  );

// Middleware for parsing JSON
app.use(express.json());

// Add the jwtToken to request
app.use(modifyToken);

// Routes
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

// Apply JWT authentication for protected routes
app.use("/api/users", jwtAuth, userRouter);
app.use("/api/contacts", jwtAuth, contactRouter);

// Error handler
app.use(errorHandler)

export default app;