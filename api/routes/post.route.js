import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost);
router.get("/getsinglepost/:postId",verifyToken,getSinglePost);

export default router;
