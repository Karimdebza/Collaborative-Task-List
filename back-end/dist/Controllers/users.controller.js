"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(req, res) {
    try {
        const userData = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(userData.password, 10);
        const [result] = await connexion_db_1.default.execute(" INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [userData.name, userData.email, hashedPassword]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId });
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur : aucune ID insérée" });
        }
    }
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la création de l'utilisateur" });
    }
}
exports.createUser = createUser;
async function getAllUsers(req, res) {
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM user");
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des utilisateurs" });
    }
}
exports.getAllUsers = getAllUsers;
async function getUserById(req, res) {
}
exports.getUserById = getUserById;
async function updateUser(req, res) {
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
}
exports.deleteUser = deleteUser;
