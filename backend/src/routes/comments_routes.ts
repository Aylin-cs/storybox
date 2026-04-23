import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

router.post("/", authMiddleware, (req, res) =>
  commentsController.create(req, res)
);

router.get("/", (req, res) =>
  commentsController.getAll(req, res)
);

router.get("/:id", (req, res) =>
  commentsController.getById(req, res)
);

router.put("/:id", authMiddleware, (req, res) =>
  commentsController.update(req, res)
);

export default router;