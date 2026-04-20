import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/users_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ _id: userId }, ACCESS_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ _id: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { userName, email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await userModel.create({
        userName,
        email,
        password: hashedPassword,
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
      const tokens = generateTokens(user._id!);

      if (!user.refreshToken) {
        user.refreshToken = [tokens.refreshToken];
      } else {
        user.refreshToken.push(tokens.refreshToken);
      }

      await user.save();

      res.status(200).json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch {
      res.status(500).json({ message: "Login failed" });
    }
  }

    async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token missing" });
      }

      const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { _id: string };

      const user = await userModel.findById(payload._id);

      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      if (!user.refreshToken || !user.refreshToken.includes(refreshToken)) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const tokens = generateTokens(user._id!);

      user.refreshToken = user.refreshToken.filter((token) => token !== refreshToken);
      user.refreshToken.push(tokens.refreshToken);

      await user.save();

      res.status(200).json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }

    async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token missing" });
      }

      const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { _id: string };

      const user = await userModel.findById(payload._id);

      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      if (!user.refreshToken || !user.refreshToken.includes(refreshToken)) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      user.refreshToken = user.refreshToken.filter((token) => token !== refreshToken);

      await user.save();

      res.status(200).json({ message: "Logged out successfully" });
    } catch {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }

}

export default new AuthController();
type Payload = {
  _id: string;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("authorization");
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  jwt.verify(token, ACCESS_SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    req.params.userId = (payload as Payload)._id;
    next();
  });
};