import mongoose from "mongoose";

export interface IPost {
  content: string;
  ownerId: mongoose.Types.ObjectId;
  image_uri?: string;
  created_at?: Date;
  comment_count?: number;
}

const postSchema = new mongoose.Schema<IPost>({
  content: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  image_uri: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comment_count: {
    type: Number,
    default: 0,
  },
});

export const postModel = mongoose.model<IPost>("Posts", postSchema);