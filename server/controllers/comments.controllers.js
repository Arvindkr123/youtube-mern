import { createError } from "../error.js";
import CommentModel from "../models/comment.models.js";
import VideoModel from "../models/video.models.js";

export const addCommentsController = async (req, res, next) => {
  const newComment = new CommentModel({ ...req.body, userId: req.user.id });
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsController = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentsController = async (req, res, next) => {
  try {
    //thinking: first find that commnet which you want to delete
    const comment = await CommentModel.find(req.params.id);
    // find that video which you commneted
    const video = await VideoModel.find(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await CommentModel.findByIdAndDelete(req.params.id);
      res.status(200).send("Comment has been deleted Successfully!!");
    } else {
      return next(createError(403, "You can only delete your comment"));
    }
  } catch (error) {
    next(error);
  }
};
