import { createError } from "../error.js";
import UserModel from "../models/user.models.js";

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
const likeVideoControllers = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const dislikeVideoControllers = (req, res, next) => {
  try {
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
