import { Request, Response } from 'express';
import pool from '../config/connexion-db';
import { Task } from "../models/task.model";
import { Comments } from "../models/Comment.model";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export async function addComment(req:Request, res:Response): Promise<void> {
    const commetData :Comments = req.body;
    try {
        const [result]:[ResultSetHeader, any] = await pool.execute("INSERT INTO Comments(content, id_user, id_task) VALUES (?,?,?)", [commetData.content, commetData.id_user, commetData.id_task]);
        if (result.insertId) {
            res.status(201).json({ message: "Commentaire ajouté avec succès", id: result.insertId });
        } else {
            res.status(500).json({ message: "Erreur lors de l'ajout du commentaire: aucun ID inséré" });
        }
        
    }catch(error){
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).json({ message: "Erreur du serveur lors de l'ajout du commentaire", error });
    }
}


export async function getComments(req: Request, res: Response): Promise<void> {
    const taskId = req.params.taskId;
    try {
        const [rows] = await pool.execute("SELECT * FROM Comments WHERE id_task = ?", [taskId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des commentaires" });
    }
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
    const commentId = req.params.id;
    try {
        await pool.execute("DELETE FROM Comments WHERE id_comment = ?", [commentId]);
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la suppression du commentaire" });
    }
}