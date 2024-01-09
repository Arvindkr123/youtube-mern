import { createError } from "../error.js";
import UserModel from "../models/user.models.js";
import VideoModel from "./../models/video.models.js";

const addVideoController = async (req, res, next) => {
  try {
    const newVideo = new VideoModel({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).send(savedVideo);
  } catch (error) {
    next(err);
  }
};

const updateVideoController = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found.."));
    }

    if (req.user.id === video.userId) {
      const updateVideo = await VideoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      next(createError(403, "You can only update your video.."));
    }
  } catch (error) {
    next(err);
  }
};
const deleteVideoController = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found.."));
    }

    if (req.user.id === video.userId) {
      await VideoModel.findByIdAndDelete(req.params.id);
      res.status(200).json("video deleted successfully");
    } else {
      next(createError(403, "You can only update your video.."));
    }
  } catch (error) {
    next(err);
  }
};
const getVideoController = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(err);
  }
};

const addVideoViewsController = async (req, res, next) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json("The video view has been increased!!");
  } catch (error) {
    next(err);
  }
};

const randomVideosViewsController = async (req, res, next) => {
  try {
    const videos = await VideoModel.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};

const trendVideosViewsController = async (req, res, next) => {
  try {
    const videos = await VideoModel.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};

const subscribeVideosController = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await UserModel.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return VideoModel.find({ userId: channelId });
      })
    );
    res.status(200).send(list.flat().sort((a, b) => a.createdAt - b.createdAt));
  } catch (error) {
    next(error);
  }
};

const getVideosByTagsController = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  // console.log(tags);
  try {
    const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
const getVideosBySearchController = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await VideoModel.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export {
  subscribeVideosController,
  trendVideosViewsController,
  randomVideosViewsController,
  addVideoViewsController,
  addVideoController,
  updateVideoController,
  deleteVideoController,
  getVideoController,
  getVideosByTagsController,
  getVideosBySearchController,
};
