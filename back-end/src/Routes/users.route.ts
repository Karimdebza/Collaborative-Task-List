import express from "express";
import * as userController from "../Controllers/users.controller";

export const userRouter = express.Router();

userRouter.post("/create", userController.createUser);
userRouter.get("/all", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.post('/auth', userController.signinUser)