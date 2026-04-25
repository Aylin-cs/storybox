import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */

router.post("/", authMiddleware, (req, res) =>
  commentsController.create(req, res)
);

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Get comments (optionally by postId)
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */

router.get("/", (req, res) =>
  commentsController.getAll(req, res)
);

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment found
 */

router.get("/:id", (req, res) =>
  commentsController.getById(req, res)
);

router.put("/:id", authMiddleware, (req, res) =>
  commentsController.update(req, res)
);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 */

router.delete("/:id", authMiddleware, (req, res) =>
  commentsController.delete(req, res)
);

export default router;