import express from "express";
import * as commentController from "../Controllers/comment.controller";

export const commentRouter = express.Router();

commentRouter.post("/add", commentController.addComment);
commentRouter.get("/all/:id", commentController.getComments);
commentRouter.delete("/delete/:id", commentController.deleteComment);
