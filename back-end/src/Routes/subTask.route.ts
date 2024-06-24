import express from "express";
import * as subTaskController from "../Controllers/subTask.controller";

export const subTaskRouter = express.Router();

subTaskRouter.post("/create/:taskId", subTaskController.createSubTask);
subTaskRouter.get("/all/:taskId", subTaskController.getAllSubTasks);
subTaskRouter.get("/:id", subTaskController.getSubTaskById);
subTaskRouter.put("/update/:id", subTaskController.updateSubTask);
subTaskRouter.delete("/delete/:id", subTaskController.deleteSubTask);