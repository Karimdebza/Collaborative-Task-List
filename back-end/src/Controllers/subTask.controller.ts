// // controllers/subtask.controller.ts
// import { Request, Response } from "express";
// import pool from "../config/connexion-db";
// import { SubTask } from "../models/subTask.model";

// export async function createSubTask(req: Request, res: Response): Promise<void> {
//     try {
//         const subTaskData: SubTask = req.body;
//         const [result] = await pool.execute(
//             "INSERT INTO SubTask (name, description, date_of_create, date_of_expiry, id_task, isCompleted) VALUES (?, ?, ?, ?, ?, ?)",
//             [subTaskData.name, subTaskData.description, subTaskData.date_of_create, subTaskData.date_of_expiry, subTaskData.id_task, subTaskData.isCompleted]
//         );
//         res.status(201).json({ id: result.insertId });
//     } catch (error) {
//         console.error("Erreur lors de la création de la sous-tâche :", error);
//         res.status(500).json({ message: "Erreur du serveur lors de la création de la sous-tâche", error });
//     }
// }