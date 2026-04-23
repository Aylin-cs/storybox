import { Request, Response } from "express";
import { postModel } from "../models/posts_model";

class PostsController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const newPost = await postModel.create({
        ...req.body,
        ownerId: userId,
      });
      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ message: "Failed to create post" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts = await postModel.find();
      res.status(200).json(posts);
    } catch {
      res.status(500).json({ message: "Failed to get posts" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const post = await postModel.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.ownerId.toString() !== req.params.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      res.status(200).json(updatedPost);
    } catch {
      res.status(500).json({ message: "Failed to update post" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const post = await postModel.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.ownerId.toString() !== req.params.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await postModel.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Post deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete post" });
    }
  }
}

export default new PostsController();
