// Import the database connection from '../db.js'
import { db } from '../utils/db.js';

export const getUsers = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM users ORDER BY lastname, firstname ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM users WHERE user_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        const [result] = await db.query(
            "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
            [firstname, lastname, email, password]
        );

        res.json({
            user_id: result.insertId,
            firstname,
            lastname,
            email,
            password
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        const [result] = await db.query(
            "UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE user_id = ?",
            [firstname, lastname, email, password, req.params.userId]
        );

        res.json({
            user_id: req.params.userId,
            firstname,
            lastname,
            email,
            password
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [req.params.userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};