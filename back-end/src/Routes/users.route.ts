import express from "express";
import * as userController from "../Controllers/users.controller";

export const userRouter = express.Router();

userRouter.post("/create", userController.createUser);
userRouter.get("/all", userController.getAllUsers);