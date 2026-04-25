import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import aiController from "../controllers/ai_controller";

const router = express.Router();

/**
 * @openapi
 * /ai/caption:
 *   post:
 *     summary: Generate AI caption for a post
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Generated caption
 */

router.post("/caption", authMiddleware, (req, res) =>
  aiController.generatePostCaption(req, res)
);

export default router;