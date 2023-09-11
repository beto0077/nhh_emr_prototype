/*import express from 'express';
import db from '../../utils/db.js';

const api = express.Router();

api.get('/doctors', (req, res) => {
    const sql = "SELECT first_name, last_name, email, specialisation FROM doctors";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
    //res.send({message: 'Hello Dark World 2!'});
});

api.get('/patients', (req, res) => {
    const sql = "SELECT first_name, last_name, email, address, phone_no FROM patient";

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

// api.get();

export default api;*/

import express from 'express';
import { db } from '../../utils/db.js';

const api = express.Router();

export const getDoctors = async (req, res) => {
    try {
        const sql = "SELECT first_name, last_name, email, specialisation FROM doctors";
        const [result] = await db.query(sql);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPatients = async (req, res) => {
    try {
        const sql = "SELECT first_name, last_name, email, address, phone_no FROM patient";
        const [result] = await db.query(sql);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// You can add more functions here

api.get('/doctors', getDoctors);
api.get('/patients', getPatients);

export default api;