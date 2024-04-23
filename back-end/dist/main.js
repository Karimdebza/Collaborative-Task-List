"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connexion_db_1 = __importDefault(require("./config/connexion-db"));
dotenv_1.default.config();
const { API_PORT } = process.env;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({
        message: "good path "
    });
});
app.listen(API_PORT, () => {
    console.log("lapllication tourne sur le port " + API_PORT);
});
async function fetchData() {
    try {
        const [rows, fields] = await connexion_db_1.default.execute('SELECT * FROM Task-list');
        console.log('Résultats de la requête :', rows);
    }
    catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
}
fetchData();
