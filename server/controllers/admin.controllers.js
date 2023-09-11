import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const getAdmins = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM admin ORDER BY admin_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdmin = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM admin WHERE admin_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_no, designation, password, address, salary } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO admin (first_name, last_name, email, phone_no, designation, password, address, salary) VALUES (?,?,?,?,?,?,?,?)",
            [first_name, last_name, email, phone_no, designation, hashedPassword, address, salary]
        );

        res.json({
            admin_id: result.insertId,
            first_name,
            last_name,
            email,
            phone_no,
            designation,
            password,
            address,
            salary
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_no, designation, password, address, salary } = req.body;
        const [result] = await db.query(
            "UPDATE admin SET first_name=?, last_name=?, email=?, phone_no=?, designation=?, password=?, address=?, salary=? WHERE admin_id = ?",
            [first_name, last_name, email, phone_no, designation, password, address, salary, req.params.id]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM admin WHERE admin_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignDoctor = async (req, res) => {
    try {
        const data = {
            patient_id: req.body.patient_id,
            doctor_id: req.body.doctor_id
        };

        const selectQuery = "SELECT * FROM assign_doctor WHERE patient_id = ?";
        const insertQuery = "INSERT INTO assign_doctor (patient_id, doctor_id) VALUES (?, ?)";

        const [selectResult] = await db.query(selectQuery, [data.patient_id]);

        if (selectResult[0] === undefined) {
            const [insertResult] = await db.query(insertQuery, [data.patient_id, data.doctor_id]);
            res.status(200).json({ message: 'Assigned doctor to patient' });
            //res.send("Assigned doctor to patient.");
        } else {
            res.status(400).json({ message: 'Doctor is already assigned to this patient' });
            //res.send("Doctor is already assigned to this patient.");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const findQuery = `SELECT admin_id, password FROM admin WHERE email = ?`;
        const [results] = await db.query(findQuery, [email]);

        if (results.length > 0) {
            const adminId = results[0].admin_id;
            const hashedPassword = results[0].password;

            if (bcrypt.compareSync(password, hashedPassword)) {
                const token = jwt.sign({adminId}, SECRET_KEY, {expiresIn: '24h'});
                res.status(200).json({token});
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({message: 'Email not found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};