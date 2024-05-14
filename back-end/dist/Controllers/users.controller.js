"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    const userId = parseInt(req.params.id);
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM user WHERE id_user = ?", [userId]);
        const users = rows;
        if (Array.isArray(users) && users.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé dans la base de données" });
        }
        else {
            res.status(200).json(users[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de l'utilisateur" });
    }
}
exports.getUserById = getUserById;
async function updateUser(req, res) {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(userData.password, 10);
    try {
        await connexion_db_1.default.execute("UPDATE user SET name = ?, email = ?, password = ? WHERE id_user = ? ", [userData.name, userData.email, hashedPassword, userId]);
        res.status(201).json({ message: "Utilisateur mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de l'utilisateur" });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const userId = parseInt(req.params.id);
    try {
        await connexion_db_1.default.execute("DELETE FROM user WHERE id_user = ?", [userId]);
        res.status(201).json({ message: "Utilisateur supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la mise à jour de l'utilisateur" });
    }
}
exports.deleteUser = deleteUser;
async function signinUser(req, res) {
    try {
        const { email, password } = req.body;
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM user WHERE email = ?", [email]);
        const users = rows;
        if (users.length === 0) {
            res.status(401).json({ message: "Adresse e-mail incorrecte" });
            return;
        }
        const user = users[0];
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Mot de passe incorrect" });
            return;
        }
        const userId = user.id_user;
        const payload = { user_id: userId };
        let token;
        if (process.env.JWT_SECRET_KEY) {
            token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
            console.log(token);
        }
        else {
            console.error('La clé secrète JWT n\'est pas définie dans les variables d\'environnement.');
        }
        res.status(200).json({ message: "Authentification réussie", token });
    }
    catch (error) {
        console.error("Erreur lors de l'authentification de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de l'authentification de l'utilisateur" });
    }
}
exports.signinUser = signinUser;
