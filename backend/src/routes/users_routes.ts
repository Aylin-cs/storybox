import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import usersController from "../controllers/users_controller";

const router = express.Router();

router.get("/", usersController.getAll);
router.get("/me", authMiddleware, (req, res) =>
  usersController.getById(req, res)
);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);

export default router;