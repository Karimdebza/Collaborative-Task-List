import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { User } from "../models/users.model";
import bcrypt from "bcrypt"
import { QueryResult, FieldPacket } from "mysql2/promise";

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
    
}

export async function deleteUser(req:Request, res:Response): Promise<void> {
    
}