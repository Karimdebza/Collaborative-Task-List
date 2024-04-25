"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function createTask(req, res) {
    const userId = req.params.id;
    try {
        const taskData = req.body;
        const [result] = await connexion_db_1.default.execute("INSERT INTO Task (name, description, date_of_create, date_of_expiry,id_task_list,  id_user ) VALUES (?, ?, ?, ?, ?, ?)", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, userId]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId });
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
exports.createTask = createTask;
async function getAllTasks(req, res) {
    const userId = req.params.id;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Task WHERE id_user = ?", [userId]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des taches" });
    }
}
exports.getAllTasks = getAllTasks;
async function getTaskById(req, res) {
    const taskId = parseInt(req.params.id);
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Task WHERE id_task = ?", [taskId]);
        const tasks = rows;
        if (Array.isArray(tasks) && tasks.length === 0) {
            res.status(404).json({ message: "Tache non trouvé dans la base de données" });
        }
        else {
            res.status(200).json(tasks[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la tache" });
    }
}
exports.getTaskById = getTaskById;
async function updateTask(req, res) {
    const taskId = parseInt(req.params.id);
    const taskData = req.body;
    try {
        await connexion_db_1.default.execute("UPDATE Task SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?, id_task_list = ?, id_user = ? WHERE id_task = ?", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, taskData.id_user, taskId]);
        res.status(201).json({ message: "Tache mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la tache " });
    }
}
exports.updateTask = updateTask;
async function deleteTask(req, res) {
    const taskId = parseInt(req.params.id);
    try {
        await connexion_db_1.default.execute("DELETE FROM Task WHERE id_task = ?", [taskId]);
        res.status(201).json({ message: "Tache supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la supression de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la tache " });
    }
}
exports.deleteTask = deleteTask;
