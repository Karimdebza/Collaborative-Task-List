"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopTracking = exports.startTraking = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function createTask(req, res) {
    const userId = req.params.id;
    try {
        const taskData = req.body;
        const [result] = await connexion_db_1.default.execute("INSERT INTO Task (name, description, date_of_create, date_of_expiry, id_task_list, timeSpent,  startTime, isTracking,  id_user ) VALUES (?, ?, ?, ?, ?, ?,?,?,?)", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, taskData.timeSpent, taskData.startTime, taskData.isTracking, userId]);
        if ('insertId' in result) {
            const taskName = taskData.name;
            const io = req.app.get('io'); // Accédez à l'instance de Socket.io
            if (io) { // Vérifiez si l'instance de Socket.io est définie
                io.emit('receivedNotification', {
                    message: `Nouvelle tâche créée: ${taskName}`,
                    date: new Date()
                });
            }
            res.status(201).json({ id: result.insertId });
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la tache : aucune ID insérée" });
        }
    }
    catch (error) {
        console.error("Erreur lors de la création de la tache  :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de la tache ", error });
    }
}
exports.createTask = createTask;
async function getAllTasks(req, res) {
    const taskListId = req.params.id;
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Task WHERE id_task_list = ?", [taskListId]);
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
        await connexion_db_1.default.execute("UPDATE Task SET name = ?, description = ?, date_of_create = ?, date_of_expiry = ?,  id_task_list = ?  WHERE id_task = ?", [taskData.name, taskData.description, taskData.date_of_create, taskData.date_of_expiry, taskData.id_task_list, taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
            io.emit('receivedNotification', {
                message: ` tâche modifier: ${taskName}`,
                date: new Date()
            });
        }
        res.status(201).json({ message: "Tache mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de la tache " });
    }
}
exports.updateTask = updateTask;
async function deleteTask(req, res) {
    const taskData = req.body;
    const taskId = parseInt(req.params.id);
    try {
        await connexion_db_1.default.execute("DELETE FROM Task WHERE id_task = ?", [taskId]);
        const taskName = taskData.name;
        const io = req.app.get('io'); // Accédez à l'instance de Socket.io
        if (io) { // Vérifiez si l'instance de Socket.io est définie
            io.emit('receivedNotification', {
                message: ` tâche supprimer: ${taskName}`,
                date: new Date()
            });
        }
        res.status(201).json({ message: "Tache supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la supression de la tache :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la supression de la tache " });
    }
}
exports.deleteTask = deleteTask;
async function startTraking(req, res) {
    try {
        const taskId = req.params.id;
        const query = ` UPDATE Task SET startTime = NOW(), isTracking = TRUE WHERE id_task = ?`;
        await connexion_db_1.default.execute(query, [taskId]);
        const task = await connexion_db_1.default.execute('SELECT * FROM Task WHERE id_task = ?', [taskId]);
        res.json(task[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur du serveur   ", error });
    }
}
exports.startTraking = startTraking;
async function stopTracking(req, res) {
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
        await connexion_db_1.default.execute(query, [taskId]);
        const [rows] = await connexion_db_1.default.execute('SELECT * FROM Task WHERE id_task = ?', [taskId]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        // Envoyez la tâche mise à jour en réponse
        res.json(rows[0]);
    }
    catch (error) {
        console.error('Error stopping task tracking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.stopTracking = stopTracking;
