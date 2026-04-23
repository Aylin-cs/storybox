import { Request, Response } from "express";
import { commentModel } from "../models/comments_model";
import { postModel } from "../models/posts_model";

class CommentsController {
  async create(req: Request, res: Response) {
    try {
      const { postId, content } = req.body;
      const userId = req.params.userId;

      const post = await postModel.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const newComment = await commentModel.create({
        postId,
        content,
        ownerId: userId,
      });

      await postModel.findByIdAndUpdate(postId, {
        $inc: { comment_count: 1 },
      });

      res.status(201).json(newComment);
    } catch {
      res.status(500).json({ message: "Failed to create comment" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { postId } = req.query;

      if (postId) {
        const comments = await commentModel.find({ postId });
        return res.status(200).json(comments);
      }

      const comments = await commentModel.find();
      res.status(200).json(comments);
    } catch {
      res.status(500).json({ message: "Failed to get comments" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const comment = await commentModel.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json(comment);
    } catch {
      res.status(500).json({ message: "Failed to get comment" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const comment = await commentModel.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.ownerId.toString() !== req.params.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedComment = await commentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      res.status(200).json(updatedComment);
    } catch {
      res.status(500).json({ message: "Failed to update comment" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const comment = await commentModel.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.ownerId.toString() !== req.params.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await commentModel.findByIdAndDelete(req.params.id);
      await postModel.findByIdAndUpdate(comment.postId, {
      $inc: { comment_count: -1 },
    });
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete comment" });
    }
  }
}

export default new CommentsController();