/*import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from '../../../utils/db.js';

const users = express.Router();

const SECRET_KEY = 'Arijit';

users.post('/register', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    let find = `SELECT * FROM users WHERE email = "${userData.email}"`;

    db.query(find, (err1, result1) => {
        if (err1) console.log(err1);
        console.log(result1[0]);

        if (result1[0] == undefined) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;

                let create = `INSERT INTO users (firstname, lastname, email, password)
                              VALUES ( "${userData.first_name}", 
                                       "${userData.last_name}", 
                                       "${userData.email}",
                                       "${userData.password}")`;

                db.query(create, (err2, result2) => {
                    if (err2) console.log(err2);
                    res.send("Created Database ooooooooooooohhhhhh");
                })
            });
        } else {
            res.send("user already exist...");
        }
    });
});

users.get('/login', (req, res) => {
    let find = `SELECT password, user_id FROM users WHERE email = "${req.body.email}"`;

    db.query(find, (err, result) => {
        if (err) console.log(err);
        console.log(result);

        if (result[0] != undefined) {
            if (bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign(result[0].user_id, SECRET_KEY);
                res.send(token);
            } else {
                res.send('Password incorrect');
            }
        } else {
            res.send("Email not found");
        }
    });
});

users.get('/profile', (req, res) => {
    let user_id = jwt.verify(req.headers['authorization'], SECRET_KEY);

    let user = `SELECT * FROM users WHERE user_id = ${user_id}`;
    db.query(user, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

export default users;*/
import { Router } from "express";

import { getUsers, getUser, createUser, updateUser, deleteUser } from "../../../controllers/users.controller.js";

const router = Router();

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router;