import { Request, Response } from "express";
const express = require('express');
import mongoose from "mongoose";
import config from './config';
const cors = require('cors');

import registerRouter from './routers/registerRouter';
import userRouter from "./routers/userRouter";

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

// Routes
app.use("/api/register", registerRouter);
app.use("/api/users", userRouter);

export default app;