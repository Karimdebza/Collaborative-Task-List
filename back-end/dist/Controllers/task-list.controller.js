"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskList = exports.updateTaskList = exports.getTaskListById = exports.getAllTaskLists = exports.createTaskList = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function createTaskList(req, res) {
    const userId = req.params.id;
    try {
        const taskListData = req.body;
        const [result] = await connexion_db_1.default.execute("INSERT INTO TaskLists (title, date_of_create, id_user) VALUES (?, ?, ?)", [taskListData.title, taskListData.date_of_create, userId]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId });
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
exports.createTaskList = createTaskList;
async function getAllTaskLists(req, res) {
    const userId = req.params.id;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM TaskLists WHERE id_user = ?", [userId]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des listes de  taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des listes de  taches" });
    }
}
exports.getAllTaskLists = getAllTaskLists;
async function getTaskListById(req, res) {
    const taskListId = parseInt(req.params.id);
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM TaskLists WHERE id_task_list = ?", [taskListId]);
        const tasks = rows;
        if (Array.isArray(tasks) && tasks.length === 0) {
            res.status(404).json({ message: "la liste des Taches et  non trouvé dans la base de données" });
        }
        else {
            res.status(200).json(tasks[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la liste des  taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la liste des taches" });
    }
}
exports.getTaskListById = getTaskListById;
async function updateTaskList(req, res) {
    const taskListId = parseInt(req.params.id);
    const taskListData = req.body;
    try {
        await connexion_db_1.default.execute("UPDATE TaskLists SET title = ?, date_of_create = ?, id_user = ? WHERE id_task_list = ?", [taskListData.title, taskListData.date_of_create, taskListData.id_user, taskListId]);
        res.status(201).json({ message: " les informations de la liste des taches on etais  mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de la liste taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la liste des taches " });
    }
}
exports.updateTaskList = updateTaskList;
async function deleteTaskList(req, res) {
    const taskId = parseInt(req.params.id);
    try {
        await connexion_db_1.default.execute("DELETE FROM TaskLists WHERE id_task_list = ?", [taskId]);
        res.status(201).json({ message: "la liste des taches est  supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la supression  de la liste des taches :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression  de la liste des taches " });
    }
}
exports.deleteTaskList = deleteTaskList;
