import express from "express";
import dotenv from "dotenv";
import connectionDb from "./db/connectionDb.js";
import userRoutes from "./routes/users.routes.js";
import videoRoutes from "./routes/videos.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// error handlers middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

connectionDb()
  .then(() => {
    app.listen(8080, () => {
      console.log("listening on port 8080");
    });
  })
  .catch((error) => {
    console.log("error", error.message);
  });
