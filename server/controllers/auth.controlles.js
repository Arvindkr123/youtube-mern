import { createError } from "../error.js";
import UserModel from "./../models/user.models.js";
import bcrypt from "bcryptjs";
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
    next(createError(404, "not found sorry..!!"));
  }
};

export { signupControllers };
