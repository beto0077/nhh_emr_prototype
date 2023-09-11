// Import the database connection from '../db.js'
import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findQuery = `SELECT doctor_id, password FROM doctors WHERE email = ?`;
        const [results] = await db.query(findQuery, [email]);

        if (results.length > 0) {
            const doctorId = results[0].doctor_id;
            const hashedPassword = results[0].password;

            if (bcrypt.compareSync(password, hashedPassword)) {
                const token = jwt.sign({ doctorId }, SECRET_KEY, { expiresIn: '24h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctors = async (req, res) => {
    try {
        //const [result] = await db.query("SELECT * FROM doctors ORDER BY last_name, first_name ASC");
        const [result] = await db.query("SELECT * FROM doctors ORDER BY doctor_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctor = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM doctors WHERE doctor_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createDoctor = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            address,
            email,
            salary,
            specialisation,
            shift_time,
            password
        } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO doctors (first_name, last_name, address, email, salary, specialisation, shift_time, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, address, email, salary, specialisation, shift_time, hashedPassword]
        );

        res.json({
            doctor_id: result.insertId,
            first_name,
            last_name,
            address,
            email,
            salary,
            specialisation,
            shift_time
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE doctors SET ? WHERE doctor_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM doctors WHERE doctor_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctorPatients = async (req, res) => {
    try {
        const sql = `SELECT 
                        p.patient_id,
                        p.first_name,
                        p.last_name
                    FROM assign_doctor ad
                        JOIN patient p ON p.patient_id = ad.patient_id
                    WHERE ad.doctor_id = ?`;

        const [result] = await db.query(sql, [req.params.id]);

        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};