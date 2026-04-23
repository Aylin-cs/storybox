import mongoose from "mongoose";

export interface IComment {
  postId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  content: string;
  created_at: Date;
}

const commentSchema = new mongoose.Schema<IComment>({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const commentModel = mongoose.model<IComment>("Comments", commentSchema);