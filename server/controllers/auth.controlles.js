import { createError } from "../error.js";
import UserModel from "./../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupControllers = async (req, res, next) => {
  // console.log(req.body)
  try {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({ ...req.body, password: hashPassword });
    // save in database
    await newUser.save();
    res.status(200).send("User has been created..");
  } catch (error) {
    next(error);
  }
};

// sign in controller
const signinControllers = async (req, res, next) => {
  // console.log(req.body)
  try {
    const user = await UserModel.findOne({ name: req.body.name });
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    // now compare password..
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      return next(createError(400, "wrong credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    //not send password
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ success: true, others });
  } catch (error) {
    next(error);
  }
};

export { signupControllers, signinControllers };
