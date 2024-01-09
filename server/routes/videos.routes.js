import express from "express";
import verifyToken from "../verifyToken.js";
import {
  addVideoController,
  updateVideoController,
  deleteVideoController,
  getVideoController,
  addVideoViewsController,
  trendVideosViewsController,
  randomVideosViewsController,
  subscribeVideosController,
  getVideosByTagsController,
  getVideosBySearchController,
} from "../controllers/videos.controlles.js";

const router = express.Router();

// create a video
router.post("/", verifyToken, addVideoController);
router.put("/:id", verifyToken, updateVideoController);
router.delete("/:id", verifyToken, deleteVideoController);
router.get("/find/:id", getVideoController);
router.put("/view/:id", addVideoViewsController);
router.get("/trend", trendVideosViewsController);
router.get("/random", randomVideosViewsController);
router.get("/sub", verifyToken, subscribeVideosController);
router.get("/tags", getVideosByTagsController);
router.get("/search", getVideosBySearchController);

export default router;
