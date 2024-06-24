"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.getTagById = exports.getAllTags = exports.createTag = void 0;
const connexion_db_1 = __importDefault(require("../config/connexion-db"));
async function createTag(req, res) {
    try {
        const tagData = req.body;
        const [result] = await connexion_db_1.default.execute("INSERT INTO Tag (name, color) VALUES (?, ?)", [tagData.name, tagData.color]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId });
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la liste des  taches : aucune ID insérée" });
        }
    }
    catch (error) {
        console.error("Erreur lors de la création de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de l'étiquette", error });
    }
}
exports.createTag = createTag;
async function getAllTags(req, res) {
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Tag");
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des étiquettes :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des étiquettes", error });
    }
}
exports.getAllTags = getAllTags;
async function getTagById(req, res) {
    try {
        const [rows] = await connexion_db_1.default.execute("SELECT * FROM Tag WHERE id_tag = ?", [req.params.id]);
        const tag = rows;
        if (Array.isArray(tag) && tag.length === 0) {
            res.status(404).json({ message: "Tache non trouvé dans la base de données" });
        }
        else {
            res.status(200).json(tag[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de l'étiquette", error });
    }
}
exports.getTagById = getTagById;
async function updateTag(req, res) {
    try {
        const tagData = req.body;
        const [result] = await connexion_db_1.default.execute("UPDATE Tag SET name = ?, color = ? WHERE id_tag = ?", [tagData.name, tagData.color, req.params.id]);
        res.status(200).json({ message: "Étiquette mise à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de l'étiquette", error });
    }
}
exports.updateTag = updateTag;
async function deleteTag(req, res) {
    try {
        const [result] = await connexion_db_1.default.execute("DELETE FROM Tag WHERE id_tag = ?", [req.params.id]);
        res.status(200).json({ message: "Étiquette supprimée avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la suppression de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la suppression de l'étiquette", error });
    }
}
exports.deleteTag = deleteTag;
