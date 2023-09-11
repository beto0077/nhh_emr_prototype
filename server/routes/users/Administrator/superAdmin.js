/*import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from '../../../utils/db.js';

const superAdmin = express.Router();

const SECRET_KEY = 'Arijit';

superAdmin.post('/register', (req, res) => {

    const superAdminData = {
        email       : req.body.email,
        password    : req.body.password
    }

    let find = `SELECT * FROM superAdmin WHERE email = "${superAdminData.email}"`;

    db.query(find, (err1, result1) => {
        if (err1) console.log(err1);
        //console.log(result1[0]);

        if (result1[0] == undefined) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                superAdminData.password = hash;

                let create = `INSERT INTO superAdmin ( email, password)
                              VALUES ( "${superAdminData.email}",
                                       "${superAdminData.password}")`;

                db.query(create, (err2, result2) => {
                    if (err2) console.log(err2);
                    res.send("Created Database ooooooooooooohhhhhh");
                })
            });
        } else {
            res.send("superAdmin already exist...");
        }
    });
});

superAdmin.get('/login', (req, res) => {
    let find = `SELECT password, superAdmin_id FROM superAdmin WHERE email = "${req.body.email}"`;

    db.query(find, (err, result) => {
        if (err) console.log(err);
        // console.log(result);

        if (result[0] != undefined) {
            if (bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign(result[0].superAdmin_id, SECRET_KEY);
                res.send(token);
            } else {
                res.send('Password incorrect');
            }
        } else {
            res.send("Email not found");
        }
    });
});

superAdmin.get('/profile', (req, res) => {
    let superAdmin_id = jwt.verify(req.headers['authorization'], SECRET_KEY);

    let superAdmin = `SELECT * FROM superAdmin WHERE superAdmin_id = ${superAdmin_id}`;
    db.query(superAdmin, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

export default superAdmin;*/

import { Router } from "express";

import { getSuperAdmins, getSuperAdmin, createSuperAdmin, updateSuperAdmin, deleteSuperAdmin, loginSuperAdmin } from "../../../controllers/superAdmin.controller.js";

const router = Router();

router.get('/superAdmins', getSuperAdmins)
router.get('/superAdmins/:id', getSuperAdmin)
router.post('/superAdmins', createSuperAdmin)
router.put('/superAdmins/:id', updateSuperAdmin)
router.delete('/superAdmins/:id', deleteSuperAdmin)
router.post('/login', loginSuperAdmin)

export default router;