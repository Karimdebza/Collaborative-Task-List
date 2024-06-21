import { Request, Response } from 'express';
import pool from '../config/connexion-db';
// import { Task } from "../models/task.model";
import { Comments } from "../models/Comment.model";


export async function addComment(req: Request, res: Response): Promise<void> {
    const { content, id_user, id_task } = req.body;
  
    if (!content || !id_user || !id_task) {
      res.status(400).json({ message: 'Les données du commentaire sont incomplètes' });
      return;
    }
  
    try {
      // Vérifiez que la tâche existe
      const [taskCheck]: [any, any] = await pool.execute(
        "SELECT id_task FROM Task WHERE id_task = ?",
        [id_task]
      );
  
      if (taskCheck.length === 0) {
        res.status(400).json({ message: 'La tâche spécifiée n\'existe pas' });
        return;
      }
  
      const [result]: [any, any] = await pool.execute(
        "INSERT INTO Comments(content, id_user, id_task) VALUES (?, ?, ?)",
        [content, id_user, id_task]
      );
  
      if (result.insertId) {
        const newComment: Comments = {
          id_comment: result.insertId,
          content,
          id_user,
          id_task,
          date_of_create: new Date()
        };
  
        res.status(201).json(newComment);
      } else {
        res.status(500).json({ message: "Erreur lors de l'ajout du commentaire: aucun ID inséré" });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      res.status(500).json({ message: "Erreur du serveur lors de l'ajout du commentaire", error });
    }
  }


export async function getComments(req: Request, res: Response): Promise<void> {
    const taskId = req.params.id;
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