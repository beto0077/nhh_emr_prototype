// Import the database connection from '../db.js'
import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const getPatients = async (req, res) => {
    try {
        //const [result] = await db.query("SELECT * FROM patient ORDER BY last_name, first_name ASC");
        const [result] = await db.query("SELECT * FROM patient ORDER BY patient_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPatient = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM patient WHERE patient_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPatient = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            address,
            email,
            phone_no,
            password,
            disease
        } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO patient (first_name, last_name, address, email, phone_no, password, disease) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, address, email, phone_no, hashedPassword, disease]
        );

        res.json({
            patient_id: result.insertId,
            first_name,
            last_name,
            address,
            email,
            phone_no,
            password,
            disease
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE patient SET ? WHERE patient_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM patient WHERE patient_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAssignedDoctor = async (req, res) => {
    try {
        const query = `
            SELECT 
                d.first_name as doctor_firstname,
                d.last_name as doctor_lastname,
                d.specialisation 
            FROM assign_doctor ad
            JOIN patient p ON p.patient_id = ad.patient_id
            JOIN doctors d ON ad.doctor_id = d.doctor_id
            WHERE p.patient_id = ?`;

        const [result] = await db.query(query, [req.params.id]);

        console.log(result)
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};