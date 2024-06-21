"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getComments = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function addComment(req, res) {
    const commetData = req.body;
    try {
        const [result] = await connexion_db_1.default.execute("INSERT INTO Comments(content, id_user, id_task) VALUES (?,?,?)", [commetData.content, commetData.id_user, commetData.id_task]);
        if (result.insertId) {
            res.status(201).json({ message: "Commentaire ajouté avec succès", id: result.insertId });
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
async function getComments(req, res) {
    const taskId = req.params.taskId;
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
