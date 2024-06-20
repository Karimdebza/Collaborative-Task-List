import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { TaskLists } from "../models/task-list.model";

import { QueryResult, FieldPacket } from "mysql2/promise";

export async function createTaskList(req:Request, res:Response): Promise<void> {
    const userId = req.params.id;
    try {
        const taskListData : TaskLists = req.body;
        const [result] = await pool.execute("INSERT INTO TaskLists (title, date_of_create, id_user) VALUES (?, ?, ?)", [taskListData.title, taskListData.date_of_create, userId]);
        if('insertId' in result ) {
            res.status(201).json({id: result.insertId});
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la liste des  taches : aucune ID insérée" });
        }
    } 
    catch (error) {
        console.error("Erreur lors de la création de la tache  :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la liste des taches " });
    }
}

export async function getAllTaskLists(req:Request, res:Response): Promise<void> {
   const  userId = req.params.id;
    try{
        const [rows] = await pool.execute("SELECT * FROM TaskLists WHERE  id_user = ? OR is_public = TRUE", [userId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des listes de  taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des listes de  taches" });
    }
}

export async function updateTaskLystVisibilty(req:Request, res:Response): Promise<void> {
    const taskListId = req.params.id;
    const {is_public} = req.body;
    if(typeof is_public !== 'boolean'){
         res.status(400).json({message:"Le champ 'is_public' doit être un booléen."});
    }
    try {
        const [result] = await pool.execute("UPDATE TaskLists SET is_public = ? WHERE id_task_list = ?", [is_public, taskListId]);
        if ((result as any).affectedRows > 0) { 
            res.status(200).json({ message: "Visibilité de la liste de tâches mise à jour avec succès." });
        } else {
            res.status(404).json({ message: "Liste de tâches non trouvée." });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la visibilité de la liste de tâches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la visibilité de la liste de tâches." });
    }
}

export async function getTaskListById(req:Request, res:Response): Promise<void> {
    const taskListId :number = parseInt(req.params.id) ;
    try{
        const [rows] : [QueryResult, FieldPacket[]] = await pool.execute("SELECT * FROM TaskLists WHERE id_task_list = ?", [taskListId]);
        const tasks: TaskLists[] = rows as TaskLists[];
        if(Array.isArray(tasks) && tasks.length === 0) {
            res.status(404).json({message: "la liste des Taches et  non trouvé dans la base de données"});
        } else {
            res.status(200).json(tasks[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la liste des  taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la liste des taches" });
    }
}

export async function updateTaskList(req:Request, res:Response): Promise<void> {
    const taskListId : number = parseInt(req.params.id);
    const taskListData : TaskLists = req.body; 
    try{
        await pool.execute("UPDATE TaskLists SET title = ?, date_of_create = ?, id_user = ? WHERE id_task_list = ?", [taskListData.title,  taskListData.date_of_create, taskListData.id_user, taskListId]);
        res.status(201).json({message: " les informations de la liste des taches on etais  mis à jour avec succès" });
    } catch(error) {
        console.error("Erreur lors de la mise à jour de la liste taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la liste des taches " });
    }
}

export async function deleteTaskList(req:Request, res:Response): Promise<void> {
    const taskId: number = parseInt(req.params.id);
    try {
        await pool.execute("DELETE FROM TaskLists WHERE id_task_list = ?", [taskId]);
        res.status(201).json({message: "la liste des taches est  supprimé avec succès"});
        } catch (error) {
        console.error("Erreur lors de la supression  de la liste des taches :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression  de la liste des taches " });
        }
    }
