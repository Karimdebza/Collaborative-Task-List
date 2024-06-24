// controllers/subtask.controller.ts
import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { SubTask } from "../models/subTask.model";
import { QueryResult, FieldPacket } from "mysql2/promise";
export async function createSubTask(req: Request, res: Response): Promise<void> {
    try {
        const subTaskData: SubTask = req.body;
        const taskId = req.params.taskId;
        const [result] = await pool.execute(
            "INSERT INTO subTask (name, description, date_of_create, date_of_expiry, isCompleted , id_task) VALUES (?, ?, ?, ?, ?,?)",
            [subTaskData.name, subTaskData.description, subTaskData.date_of_create, subTaskData.date_of_expiry,  subTaskData.isCompleted,taskId]
        );
        if('insertId' in result ) {
            res.status(201).json({id: result.insertId});
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la liste des  taches : aucune ID insérée" });
        }
    } catch (error) {
        console.error("Erreur lors de la création de la sous-tâche :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la sous-tâche", error });
    }
}

export async function getAllSubTasks(req:Request, res:Response): Promise<void> {
    const taskId  = req.params.taskId;
    try {
        const [rows] = await pool.execute( "SELECT * FROM subTask WHERE  id_task = ? ", [taskId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des sous taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des sous taches" });
    }
}


export async function getSubTaskById(req:Request, res:Response): Promise<void> {
    const subTaskId = req.params.id;
    try {
        const [rows]: [QueryResult, FieldPacket[]]  = await pool.execute("SELECT * FROM subTask WHERE id_subTask = ?", [subTaskId]);
        const subTask: SubTask[] = rows as SubTask[];
        if(Array.isArray(subTask) && subTask.length === 0) {
            res.status(404).json({message: "Sous Tache non trouvé dans la base de données"});
        } else {
            res.status(200).json(subTask[0]);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la sous tache" });
    }

}

export async function updateSubTask(req:Request, res:Response): Promise<void> {
    const subtaskId : number = parseInt(req.params.id);
    const taskData : SubTask = req.body; 
    try{
        await pool.execute("UPDATE subTask SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?,  isCompleted = ?  WHERE id_subTask = ?",[taskData.name, taskData.description,taskData.date_of_create,taskData.date_of_expiry, taskData.isCompleted, subtaskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
          io.emit('receivedNotification', {
            message: ` Sous tâche modifier: ${taskName}`,
            date: new Date()
          });
        }
        
        res.status(201).json({message: "Sous tache  mis à jour avec succès" });
    } catch(error) {
        console.error("Erreur lors de la mise à jour de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la sous tache ", error });
    }
}

export async function deleteSubTask(req:Request, res:Response): Promise<void> {
    const taskData : SubTask = req.body; 
    const taskId: number = parseInt(req.params.id);
    try {
        await pool.execute("DELETE FROM subTask WHERE id_subTask = ?", [taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
          io.emit('receivedNotification', {
            message: ` sous tâche supprimer: ${taskName}`,
            date: new Date()
          });
        }
        res.status(201).json({message: "sous tache supprimé avec succès"});
        } catch (error) {
        console.error("Erreur lors de la supression de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la  sous tache " });
        }
    }