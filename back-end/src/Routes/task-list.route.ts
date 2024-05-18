import express from "express";
import * as taskListController from "../Controllers/task-list.controller";

export const taskListRouter = express.Router();

taskListRouter.post("/create", taskListController.createTaskList);
taskListRouter.get("/all", taskListController.getAllTaskLists);
taskListRouter.get("/:id", taskListController.getTaskListById);
taskListRouter.put("/update/:id", taskListController.updateTaskList);
taskListRouter.delete("/delete/:id",taskListController.deleteTaskList);
