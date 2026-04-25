import express from "express";
import authController from "../controllers/auth_controller";

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */

router.post("/register", (req, res) => authController.register(req, res));

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;