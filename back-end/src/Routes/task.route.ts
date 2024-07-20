import express from "express";
import * as taskController from "../Controllers/task.controller";

export const taskRouter = express.Router();

taskRouter.post("/create/:id", taskController.createTask);
taskRouter.get("/all/:id", taskController.getAllTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.put("/update/:id", taskController.updateTask);
taskRouter.delete("/delete/:id", taskController.deleteTask);
taskRouter.put("/:id/start-tracking", taskController.startTraking);
taskRouter.put("/:id/stop-tracking", taskController.stopTracking);
taskRouter.put('/update-status/:id', taskController.updateTaskStatus);
taskRouter.get('/:taskListId/status/:status', taskController.getTasksByStatus);