import { Router } from "express";

import { getPatients, getPatient, createPatient, updatePatient, deletePatient, getAssignedDoctor } from "../../../controllers/patient.controller.js";

const router = Router();

router.get('/patients', getPatients)
router.get('/patients/:id', getPatient)
router.get('/assignedDoctor/:id', getAssignedDoctor)
router.post('/patients', createPatient)
router.put('/patients/:id', updatePatient)
router.delete('/patients/:id', deletePatient)

export default router;