import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { User } from "../models/users.model";
import bcrypt from "bcrypt"
import { QueryResult, FieldPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";

export async function createUser(req:Request, res:Response): Promise<void> {
    try {
        const userData : User = req.body;
        const hashedPassword : string = bcrypt.hashSync(userData.password, 10);
        const [result] = await pool.execute(" INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [userData.name, userData.email, hashedPassword] )
        if('insertId' in result ) {
            res.status(201).json({id: result.insertId});
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

export async function getAllUsers(req:Request, res:Response): Promise<void> {
    try{
        const [rows] = await pool.execute("SELECT * FROM user");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des utilisateurs" });
    }
}

export async function getUserById(req:Request, res:Response): Promise<void> {
    const userId :number = parseInt(req.params.id) ;
    try{
        const [rows] : [QueryResult, FieldPacket[]] = await pool.execute("SELECT * FROM user WHERE id_user = ?", [userId]);
        const users: User[] = rows as User[];
        if(Array.isArray(users) && users.length === 0) {
            res.status(404).json({message: "Utilisateur non trouvé dans la base de données"});
        } else {
            res.status(200).json(users[0]);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de l'utilisateur" });
    }
}

export async function updateUser(req:Request, res:Response): Promise<void> {
    const userId : number = parseInt(req.params.id);
    const userData : User = req.body; 
    const hashedPassword: string = bcrypt.hashSync(userData.password, 10);
    try{
        await pool.execute("UPDATE user SET name = ?, email = ?, password = ? WHERE id_user = ? ", [userData.name, userData.email, hashedPassword, userId]);
        res.status(201).json({message: "Utilisateur mis à jour avec succès" });
    } catch(error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de l'utilisateur" });
    }
}

export async function deleteUser(req:Request, res:Response): Promise<void> {
    const userId: number = parseInt(req.params.id);
    try {
        await pool.execute("DELETE FROM user WHERE id_user = ?", [userId]);
        res.status(201).json({message: "Utilisateur supprimé avec succès"});
        } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur du serveur  lors de la mise à jour de l'utilisateur" });
        }
    }

    export async function signinUser(req:Request, res:Response): Promise<void> {
        try {
          const {email, password} = req.body;
          const  [rows] : [QueryResult, FieldPacket[]]  = await pool.execute("SELECT * FROM user WHERE email = ?", [email]);
          const users : User[] = rows as User[];
            if(users.length === 0) {
                res.status(401).json({ message: "Adresse e-mail incorrecte" });
            return;
            }
            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                res.status(401).json({ message: "Mot de passe incorrect" });
            return;
            }
            const userId = user.id_user;
            const payload = { user_id:userId };
            let token: string | undefined;
            if (process.env.JWT_SECRET_KEY) {
                 token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
                console.log(token);
            } else {
                console.error('La clé secrète JWT n\'est pas définie dans les variables d\'environnement.');
            }
            res.status(200).json({ message: "Authentification réussie", token });
        } catch (error) {
            console.error("Erreur lors de l'authentification de l'utilisateur :", error);
            res.status(500).json({ message: "Erreur lors de l'authentification de l'utilisateur" });
        }
    }