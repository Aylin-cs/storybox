import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import postsController from "../controllers/posts_controller";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => postsController.create(req, res));
router.get("/", (req, res) => postsController.getAll(req, res));
router.put("/:id", authMiddleware, (req, res) => postsController.update(req, res));
router.delete("/:id", authMiddleware, (req, res) => postsController.delete(req, res));
router.post("/:id/like", authMiddleware, (req, res) => postsController.like(req, res));
export default router;