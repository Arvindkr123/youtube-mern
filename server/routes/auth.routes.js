import express from "express";
import { signupControllers } from "../controllers/auth.controlles.js";

const router = express.Router();

//DONE: Create user
router.post("/signup", signupControllers);

//DONE: Sign in user
router.post("/signin");

//DONE: google auth
router.post("/google");

export default router;
