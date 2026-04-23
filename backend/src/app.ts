import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users_routes";
import authRoutes from "./routes/auth_routes";
import postsRoutes from "./routes/posts_routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/storybox")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  
app.get("/", (req, res) => {
  res.send("StoryBox API is running 🚀");
});

export default app;