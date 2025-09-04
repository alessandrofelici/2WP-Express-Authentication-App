import { User } from "src/models/index";
const bcrypt = require('bcrypt');
import { Request, Response, NextFunction } from "express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {username, name, email, password} = req.body;

  if (username.length <= 6) {
    return void res.status(404).send({
      error: "Username must be at least 6 characters"
    });
  }

  if (password.length <= 8) {
    return void res.status(404).send({
      error: "Password must be at least 8 characters"
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return void res.status(404).send({
      error: "Invalid email address"
    });
  }
  
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
      username, 
      name, 
      email, 
      passwordHash
  });

  
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  }
  catch (err) {
    next(err);
  }
}

// sandroms521_db_user kzw3b2fUgtrP6UD7
// mongodb+srv://sandroms521_db_user:kzw3b2fUgtrP6UD7@cluster0.a9dpy2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0