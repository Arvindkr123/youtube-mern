import express from "express";
import { testController } from "../controllers/users.controlles.js";

const router = express.Router();

router.get("/test", testController);

export default router;
