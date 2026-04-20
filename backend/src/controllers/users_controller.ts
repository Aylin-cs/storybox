import { Request, Response } from "express";
import { userModel } from "../models/users_model";

class UsersController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to get users" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.userId || req.params.id;
      const user = await userModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to get user" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newUser = await userModel.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: "Failed to create user" });
    }
  }
}

export default new UsersController();