"use strict";
// import { Request, Response } from "express";
// import pool from "../config/connexion-db";
// import { Tag } from "../models/tag.model";
// export async function createTag(req: Request, res: Response): Promise<void> {
//     try {
//         const tagData: Tag = req.body;
//         const [result] = await pool.execute(
//             "INSERT INTO Tag (name, color) VALUES (?, ?)",
//             [tagData.name, tagData.color]
//         );
//         res.status(201).json({ id: result.insertId });
//     } catch (error) {
//         console.error("Erreur lors de la création de l'étiquette :", error);
//         res.status(500).json({ message: "Erreur du serveur lors de la création de l'étiquette", error });
//     }
// }
