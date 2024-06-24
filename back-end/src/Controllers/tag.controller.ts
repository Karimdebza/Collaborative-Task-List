import { Request, Response } from "express";
import pool from "../config/connexion-db";
import { Tag } from "../models/tag.model";

import { QueryResult, FieldPacket } from "mysql2/promise";
export async function createTag(req: Request, res: Response): Promise<void> {
    try {
        const tagData: Tag = req.body;
        const [result] = await pool.execute(
            "INSERT INTO Tag (name, color) VALUES (?, ?)",
            [tagData.name, tagData.color]
        );
        if('insertId' in result ) {
            res.status(201).json({id: result.insertId});
        }
        else {
            res.status(500).json({ message: "Erreur lors de la création de la liste des  taches : aucune ID insérée" });
        }
       
    } catch (error) {
        console.error("Erreur lors de la création de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la création de l'étiquette", error });
    }
}

export async function getAllTags(req: Request, res: Response): Promise<void> {
    try {
        const [rows] = await pool.execute("SELECT * FROM Tag");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des étiquettes :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des étiquettes", error });
    }
}

export async function getTagById(req: Request, res: Response): Promise<void> {
    try {
        const [rows] :[QueryResult, FieldPacket[]] = await pool.execute("SELECT * FROM Tag WHERE id_tag = ?", [req.params.id]);
        const tag: Tag[] = rows as Tag[];
        if(Array.isArray(tag) && tag.length === 0) {
            res.status(404).json({message: "Tache non trouvé dans la base de données"});
        } else {
            res.status(200).json(tag[0]);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération de l'étiquette", error });
    }
}

export async function updateTag(req: Request, res: Response): Promise<void> {
    try {
        const tagData: Tag = req.body;
        const [result] = await pool.execute(
            "UPDATE Tag SET name = ?, color = ? WHERE id_tag = ?",
            [tagData.name, tagData.color, req.params.id]
        );
            res.status(200).json({ message: "Étiquette mise à jour avec succès" });
       
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de l'étiquette", error });
    }
}

export async function deleteTag(req: Request, res: Response): Promise<void> {
    try {
        const [result] = await pool.execute("DELETE FROM Tag WHERE id_tag = ?", [req.params.id]);
            res.status(200).json({ message: "Étiquette supprimée avec succès" });
        
    } catch (error) {
        console.error("Erreur lors de la suppression de l'étiquette :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la suppression de l'étiquette", error });
    }
}