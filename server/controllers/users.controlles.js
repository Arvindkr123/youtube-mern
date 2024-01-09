import { createError } from "../error.js";
import UserModel from "../models/user.models.js";
import VideoModel from "../models/video.models.js";

// DONE:
const updateUserControllers = async (req, res, next) => {
  // first check the id's are equal to the current user id
  // console.log(req.user);
  if (req.params.id === req.user.id) {
    try {
      // now update the user
      const updateUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        updateUser,
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError(403, "You can update only your account!!"));
  }
};

//DONE:
const deleteUserControllers = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can only delete your account.."));
  }
};

// GET USER DONE:
const getUserControllers = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// DONE:
const subscribeUserControllers = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await UserModel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res
      .status(200)
      .json({ success: true, message: "Added subscribers successfully" });
  } catch (error) {
    next(error);
  }
};

const unsubscribeUserControllers = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await UserModel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res
      .status(200)
      .json({ success: true, message: "unsubscribed successfully" });
  } catch (error) {
    next(error);
  }
};

const likeVideoControllers = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  console.log(req.user);
  try {
    await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked..");
  } catch (error) {
    next(error);
  }
};
const dislikeVideoControllers = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  console.log(req.user);
  try {
    await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked..");
  } catch (error) {
    next(error);
  }
};

export {
  updateUserControllers,
  deleteUserControllers,
  getUserControllers,
  subscribeUserControllers,
  unsubscribeUserControllers,
  likeVideoControllers,
  dislikeVideoControllers,
};
