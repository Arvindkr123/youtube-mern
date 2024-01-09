import express from "express";
import verifyToken from "../verifyToken.js";
import {
  addCommentsController,
  deleteCommentsController,
  getCommentsController,
} from "../controllers/comments.controllers.js";
const router = express.Router();

router.post("/", verifyToken, addCommentsController);
router.get("/:videoId", verifyToken, getCommentsController);
router.delete("/:id", verifyToken, deleteCommentsController);

export default router;
