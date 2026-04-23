import mongoose from "mongoose";

export interface IPost {
  content: string;
  ownerId: mongoose.Types.ObjectId;
  image_uri?: string;
  created_at?: Date;
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
});

export const postModel = mongoose.model<IPost>("Posts", postSchema);