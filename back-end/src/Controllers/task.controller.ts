import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { Task } from "../models/task.model";

import { QueryResult, FieldPacket } from "mysql2/promise";
import { RowDataPacket } from 'mysql2';

export async function createTask(req:Request, res:Response): Promise<void> {
    const userId = req.params.id;
    try {
        const taskData : Task = req.body;
        const [result] = await pool.execute("INSERT INTO Task (name, description, date_of_create, date_of_expiry, id_task_list, timeSpent,  startTime, isTracking,  id_user ) VALUES (?, ?, ?, ?, ?, ?,?,?,?)", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, taskData.timeSpent, taskData.startTime, taskData.isTracking, userId ] )
        if('insertId' in result ) {
            const taskName = taskData.name;
      const io = req.app.get('io'); // Accédez à l'instance de Socket.io
      if (io) { // Vérifiez si l'instance de Socket.io est définie
        io.emit('receivedNotification', {
          message: `Nouvelle tâche créée: ${taskName}`,
          date: new Date()
        });
      }

            res.status(201).json({id: result.insertId});


        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la tache : aucune ID insérée" });
        }
    } 
    catch (error) {
        console.error("Erreur lors de la création de la tache  :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la tache ",error });
    }
}

export async function getAllTasks(req:Request, res:Response): Promise<void> {
   const  taskListId = req.params.id;
    try{
        const [rows] = await pool.execute("SELECT * FROM Task WHERE id_task_list = ?", [taskListId]);
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
        await pool.execute("UPDATE Task SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?,  id_task_list = ?  WHERE id_task = ?",[taskData.name, taskData.description,taskData.date_of_create,taskData.date_of_expiry,taskData.id_task_list, taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
          io.emit('receivedNotification', {
            message: ` tâche modifier: ${taskName}`,
            date: new Date()
          });
        }
        
        res.status(201).json({message: "Tache mis à jour avec succès" });
    } catch(error) {
        console.error("Erreur lors de la mise à jour de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la tache " });
    }
}

export async function deleteTask(req:Request, res:Response): Promise<void> {
    const taskData : Task = req.body; 
    const taskId: number = parseInt(req.params.id);
    try {
        await pool.execute("DELETE FROM Task WHERE id_task = ?", [taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
          io.emit('receivedNotification', {
            message: ` tâche supprimer: ${taskName}`,
            date: new Date()
          });
        }
        res.status(201).json({message: "Tache supprimé avec succès"});
        } catch (error) {
        console.error("Erreur lors de la supression de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la tache " });
        }
    }

    export async function startTraking(req:Request, res: Response) : Promise<void> {
       try {
        const taskId = req.params.id;
        const query = ` UPDATE Task SET startTime = NOW(), isTracking = TRUE WHERE id_task = ?`;
        await pool.execute(query, [taskId]);
        const task = await pool.execute('SELECT * FROM Task WHERE id_task = ?', [taskId]);
        res.json(task[0]);

        }
        catch (error) {
            res.status(500).json({ message: "Erreur du serveur   ", error });
        }
            }

            export async function stopTracking(req: Request, res: Response): Promise<void> {
                const taskId = req.params.id;
                const query = `
                  UPDATE Task
                  SET timeSpent = timeSpent + TIMESTAMPDIFF(MINUTE, startTime, NOW()), 
                      isTracking = FALSE, 
                      startTime = NULL
                  WHERE id_task = ?
                `;
              
                try {
                  // Exécutez la mise à jour de la tâche
                  await pool.execute(query, [taskId]);
                const [rows] = await pool.execute<(RowDataPacket & { id: number; name: string; description: string; date_of_create: Date; date_of_expiry: Date; timeSpent: number; startTime?: Date; isTracking: boolean; })[]>('SELECT * FROM Task WHERE id_task = ?', [taskId]);

                if (rows.length === 0) {
                res.status(404).json({ message: 'Task not found' });
                return;
                }
              
                  // Envoyez la tâche mise à jour en réponse
                  res.json(rows[0]);
                } catch (error) {
                  console.error('Error stopping task tracking:', error);
                  res.status(500).json({ message: 'Internal server error' });
                }
              }
