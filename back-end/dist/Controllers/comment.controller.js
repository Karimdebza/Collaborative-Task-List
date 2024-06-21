"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getComments = exports.addComment = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function addComment(req, res) {
    const { content, id_user, id_task } = req.body;
    if (!content || !id_user || !id_task) {
        res.status(400).json({ message: 'Les données du commentaire sont incomplètes' });
        return;
    }
    try {
        // Vérifiez que la tâche existe
        const [taskCheck] = await connexion_db_1.default.execute("SELECT id_task FROM Task WHERE id_task = ?", [id_task]);
        if (taskCheck.length === 0) {
            res.status(400).json({ message: 'La tâche spécifiée n\'existe pas' });
            return;
        }
        const [result] = await connexion_db_1.default.execute("INSERT INTO Comments(content, id_user, id_task) VALUES (?, ?, ?)", [content, id_user, id_task]);
        if (result.insertId) {
            const newComment = {
                id_comment: result.insertId,
                content,
                id_user,
                id_task,
                date_of_create: new Date()
            };
            res.status(201).json(newComment);
        }
        else {
            res.status(500).json({ message: "Erreur lors de l'ajout du commentaire: aucun ID inséré" });
        }
    }
    catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).json({ message: "Erreur du serveur lors de l'ajout du commentaire", error });
    }
}
exports.addComment = addComment;
async function getComments(req, res) {
    const taskId = req.params.id;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Comments WHERE id_task = ?", [taskId]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des commentaires" });
    }
}
exports.getComments = getComments;
async function deleteComment(req, res) {
    const commentId = req.params.id;
    try {
        await connexion_db_1.default.execute("DELETE FROM Comments WHERE id_comment = ?", [commentId]);
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la suppression du commentaire" });
    }
}
exports.deleteComment = deleteComment;
