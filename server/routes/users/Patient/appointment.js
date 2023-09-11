import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../../utils/db';

const router = express.Router();

const SECRET_KEY = 'Arijit';

router.get('/appointment', (req, res) => {
    const user_id = jwt.verify(req.headers['authorization'], SECRET_KEY);
    // ... (rest of the code)
});

export default router; //I think this part of the code is dead