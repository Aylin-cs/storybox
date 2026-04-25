import express from "express";
import { authMiddleware } from "../controllers/auth_controller";
import usersController from "../controllers/users_controller";
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

router.get("/", usersController.getAll);
router.get("/me", authMiddleware, (req, res) =>
  usersController.getById(req, res)
);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/me",authMiddleware,upload.single("image"), (req, res) => usersController.updateMe(req, res));

export default router;