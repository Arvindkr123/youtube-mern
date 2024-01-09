import express from "express";
import verifyToken from "./../verifyToken.js";
import {
  updateUserControllers,
  deleteUserControllers,
  getUserControllers,
  subscribeUserControllers,
  unsubscribeUserControllers,
  likeVideoControllers,
  dislikeVideoControllers,
} from "../controllers/users.controlles.js";

const router = express.Router();

// DONE: update user
router.put("/:id", verifyToken, updateUserControllers);

// DONE: delete user
router.delete("/:id", verifyToken, deleteUserControllers);

// DONE: get user
router.get("/find/:id", getUserControllers);

// DONE: susbcribe a user
router.put("/sub/:id", verifyToken, subscribeUserControllers);

// DONE: unsusbcribe a user
router.put("/unsub/:id", verifyToken, unsubscribeUserControllers);

// DONE: like video
router.put("/like/:videoId", verifyToken, likeVideoControllers);

// DONE: dislike video
router.put("/dislike/:videoId", verifyToken, dislikeVideoControllers);

export default router;
