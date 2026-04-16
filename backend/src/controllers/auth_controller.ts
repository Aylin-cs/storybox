import { Request, Response } from "express";
import { userModel } from "../models/users_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "secret";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

class AuthController {

  async register(req: Request, res: Response) {
    try {
      const { userName, email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await userModel.create({
        userName,
        email,
        password: hashedPassword
      });

      res.status(201).json(user);
    } catch {
      res.status(500).json({ message: "Register failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ _id: user._id }, SECRET);

      res.status(200).json({ token });
    } catch {
      res.status(500).json({ message: "Login failed" });
    }
  }
}

export default new AuthController();