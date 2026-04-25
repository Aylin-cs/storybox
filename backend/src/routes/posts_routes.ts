import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import postsController from "../controllers/posts_controller";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("image"), (req, res) => postsController.create(req, res));
router.get("/", (req, res) => postsController.getAll(req, res));
router.put("/:id", authMiddleware, (req, res) => postsController.update(req, res));
router.delete("/:id", authMiddleware, (req, res) => postsController.delete(req, res));
router.post("/:id/like", authMiddleware, (req, res) => postsController.like(req, res));
export default router;