import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users_routes";
import authRoutes from "./routes/auth_routes";
import postsRoutes from "./routes/posts_routes";
import commentsRoutes from "./routes/comments_routes";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import aiRoutes from "./routes/ai_routes";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/ai", aiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
setupSwagger(app);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  
app.get("/", (req, res) => {
  res.send("StoryBox API is running 🚀");
});

export default app;