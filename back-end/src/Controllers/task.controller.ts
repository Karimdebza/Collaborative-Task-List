import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { Task } from "../models/task.model";
import bcrypt from "bcrypt"
import { QueryResult, FieldPacket } from "mysql2/promise";

export async function createTask(req:Request, res:Response): Promise<void> {
    const userId = req.params.id;
    try {
        const taskData : Task = req.body;
        const [result] = await pool.execute("INSERT INTO Task (name, description, date_of_create, date_of_expiry,id_task_list,  id_user ) VALUES (?, ?, ?, ?, ?, ?)", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, userId ] )
        if('insertId' in result ) {
            res.status(201).json({id: result.insertId});
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la tache : aucune ID insérée" });
        }
    } 
    catch (error) {
        console.error("Erreur lors de la création de la tache  :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la tache " });
    }
}

export async function getAllTasks(req:Request, res:Response): Promise<void> {
   const  userId = req.params.id;
    try{
        const [rows] = await pool.execute("SELECT * FROM Task WHERE id_user = ?", [userId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des taches" });
    }
}

export async function getTaskById(req:Request, res:Response): Promise<void> {
    const taskId :number = parseInt(req.params.id) ;
    try{
        const [rows] : [QueryResult, FieldPacket[]] = await pool.execute("SELECT * FROM Task WHERE id_task = ?", [taskId]);
        const tasks: Task[] = rows as Task[];
        if(Array.isArray(tasks) && tasks.length === 0) {
            res.status(404).json({message: "Tache non trouvé dans la base de données"});
        } else {
            res.status(200).json(tasks[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la tache" });
    }
}

export async function updateTask(req:Request, res:Response): Promise<void> {
    const taskId : number = parseInt(req.params.id);
    const taskData : Task = req.body; 
    try{
        await pool.execute("UPDATE Task SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?, id_task_list = ?, id_user = ? WHERE id_task = ?", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, taskData.id_user, taskId]);
        res.status(201).json({message: "Tache mis à jour avec succès" });
    } catch(error) {
        console.error("Erreur lors de la mise à jour de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la tache " });
    }
}

export async function deleteTask(req:Request, res:Response): Promise<void> {
    const taskId: number = parseInt(req.params.id);
    try {
        await pool.execute("DELETE FROM Task WHERE id_task = ?", [taskId]);
        res.status(201).json({message: "Tache supprimé avec succès"});
        } catch (error) {
        console.error("Erreur lors de la supression de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la tache " });
        }
    }
