import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  profile_picture_uri?: string | null;
  date_joined?: Date;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture_uri: {
    type: String,
    default: null,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
});

export const userModel = mongoose.model<IUser>("Users", userSchema);