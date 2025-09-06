import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || '';
const SECRET_KEY = process.env.SECRET_KEY || '';

export default {
  PORT,
  MONGODB_URI,
  SECRET_KEY
};