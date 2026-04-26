import { Request, Response } from "express";
import mongoose from "mongoose";
import { postModel } from "../models/posts_model";

class PostsController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.params.userId as string;

      const imageUri = req.file ? req.file.filename : "";

      const newPost = await postModel.create({
        ...req.body,
        ownerId: userId,
        image_uri: imageUri,
      });

      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ message: "Failed to create post" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const sender = req.query.sender as string;
      const filter: any = {};
      if (sender) {
        filter.ownerId = sender;
      }

      const posts = await postModel
        .find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

      const totalPosts = await postModel.countDocuments(filter);
      res.status(200).json({
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        posts,
      });
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

  async like(req: Request, res: Response) {
    try {
      const userId = req.params.userId as string;
      const post = await postModel.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const liked = post.likes.some((id) => id.toString() === userId);

      if (liked) {
        post.likes = post.likes.filter((id) => id.toString() !== userId);
      } else {
        post.likes.push(new mongoose.Types.ObjectId(userId));
      }

      await post.save();

      res.status(200).json({
        likesCount: post.likes.length,
        liked: !liked,
      });
    } catch {
      res.status(500).json({ message: "Failed to like post" });
    }
  }
}

export default new PostsController();
