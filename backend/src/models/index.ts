// models/index.js
import mongoose from 'mongoose';

// Import and register the User model
import userSchema from './user';
export const User = mongoose.model('User', userSchema);

// Import and register the Contact model
import contactSchema from './contact';
export const Contact = mongoose.model('Contact', contactSchema);

// You can also export mongoose itself for convenience
export default mongoose;