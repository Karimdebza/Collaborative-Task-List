import  express,{ Request, Response,Application } from "express";
import dotenv from "dotenv"
import cors from "cors";
import { BodyParser } from "body-parser";
import pool from "./config/connexion-db";
import { promises } from "dns";
dotenv.config();

const {API_PORT} = process.env;


const app : Application = express();

app.use(cors());

app.get('/', (req:Request, res:Response) :void => {
    res.json({
        message: "good path "
    })
})

app.listen(API_PORT, (): void => {
    console.log("lapllication tourne sur le port "+ API_PORT)
    
})



async function fetchData() : Promise<void> {
    try {
        const [rows, fields] = await pool.execute(`SELECT * FROM user`);
        console.log('Résultats de la requête :', rows);
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
    }
}

fetchData();