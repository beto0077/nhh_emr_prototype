// Import the database connection from '../db.js'
import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const getSuperAdmins = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM superAdmin");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSuperAdmin = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM superAdmin WHERE superAdmin_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO superAdmin (email, password) VALUES (?, ?)",
            [email, hashedPassword]
        );

        res.json({
            superAdmin_id: result.insertId,
            email,
            password
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSuperAdmin = async (req, res) => {
    try {

        const result = await db.query(
            "UPDATE superAdmin SET ? WHERE superAdmin_id = ?",
            [req.body, req.params.superAdminId]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSuperAdmin = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM superAdmin WHERE superAdmin_id = ?", [req.params.superAdminId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginSuperAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const findQuery = `SELECT superAdmin_id, password FROM superadmin WHERE email = ?`;
        const [results] = await db.query(findQuery, [email]);

        if(results.length > 0) {
            const superAdminId = results[0].superAdmin_id;
            const hashedPassword = results[0].password;

            if(bcrypt.compareSync(password, hashedPassword)){
                const token = jwt.sign({superAdminId}, SECRET_KEY, {expiresIn: '24h'});
                res.status(200).json({token});
            } else {
                res.status(401).json({message: 'Incorrect password'});
            }
        } else {
            res.status(404).json({message: 'Email not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};