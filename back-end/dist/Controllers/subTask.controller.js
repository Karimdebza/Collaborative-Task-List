"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubTask = exports.updateSubTask = exports.getSubTaskById = exports.getAllSubTasks = exports.createSubTask = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function createSubTask(req, res) {
    try {
        const subTaskData = req.body;
        const taskId = req.params.taskId;
        const [result] = await connexion_db_1.default.execute("INSERT INTO subTask (name, description, date_of_create, date_of_expiry, isCompleted , id_task) VALUES (?, ?, ?, ?, ?,?)", [subTaskData.name, subTaskData.description, subTaskData.date_of_create, subTaskData.date_of_expiry, subTaskData.isCompleted, taskId]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId });
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la liste des  taches : aucune ID insérée" });
        }
    }
    catch (error) {
        console.error("Erreur lors de la création de la sous-tâche :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la sous-tâche", error });
    }
}
exports.createSubTask = createSubTask;
async function getAllSubTasks(req, res) {
    const taskId = req.params.taskId;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM subTask WHERE  id_task = ? ", [taskId]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des sous taches :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des sous taches" });
    }
}
exports.getAllSubTasks = getAllSubTasks;
async function getSubTaskById(req, res) {
    const subTaskId = req.params.id;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM subTask WHERE id_subTask = ?", [subTaskId]);
        const subTask = rows;
        if (Array.isArray(subTask) && subTask.length === 0) {
            res.status(404).json({ message: "Sous Tache non trouvé dans la base de données" });
        }
        else {
            res.status(200).json(subTask[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de la sous tache" });
    }
}
exports.getSubTaskById = getSubTaskById;
async function updateSubTask(req, res) {
    const subtaskId = parseInt(req.params.id);
    const taskData = req.body;
    try {
        await connexion_db_1.default.execute("UPDATE subTask SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?,  isCompleted = ?  WHERE id_subTask = ?", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.isCompleted, subtaskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
            io.emit('receivedNotification', {
                message: ` Sous tâche modifier: ${taskName}`,
                date: new Date()
            });
        }
        res.status(201).json({ message: "Sous tache  mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la sous tache ", error });
    }
}
exports.updateSubTask = updateSubTask;
async function deleteSubTask(req, res) {
    const taskData = req.body;
    const taskId = parseInt(req.params.id);
    try {
        await connexion_db_1.default.execute("DELETE FROM subTask WHERE id_subTask = ?", [taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
            io.emit('receivedNotification', {
                message: ` sous tâche supprimer: ${taskName}`,
                date: new Date()
            });
        }
        res.status(201).json({ message: "sous tache supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la supression de la sous tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la  sous tache " });
    }
}
exports.deleteSubTask = deleteSubTask;
