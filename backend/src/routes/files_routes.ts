import express from "express";
import { upload } from "../middlewares/upload_middleware";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = `http://localhost:3000/uploads/${file.filename}`;

    res.status(200).json({ url });
  } catch {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;