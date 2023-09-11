/*import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import Users from './routes/users.js';
import Patient from './routes/users/Patient/patient.js';
import Employee from './routes/users/Employee/employee.js';
import Doctor from './routes/users/Doctor/doctor.js';
import Admin from './routes/users/Administrator/admin.js';
import SuperAdmin from './routes/users/Administrator/superAdmin.js';
import Api from './routes/api/api.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', Users);
app.use('/patient', Patient);
app.use('/employee', Employee);
app.use('/doctor', Doctor);
app.use('/admin', Admin);
app.use('/super', SuperAdmin);
app.use('/api', Api);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));*/

import express from 'express';
import cors from 'cors';
/*import {dirname, join} from 'path'
import { fileURLToPath } from 'url';*/

import Admin from './routes/users/Administrator/admin.js';
import SuperAdmin from './routes/users/Administrator/superAdmin.js'
import Doctor from './routes/users/Doctor/doctor.js'
import Patient from './routes/users/Patient/patient.js'
import Users from './routes/users/Employee/users.js'

const app = express();
/*const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)*/

app.use(cors());
app.use(express.json());

app.use('/admin', Admin);
app.use('/superAdmin', SuperAdmin)
app.use('/doctor', Doctor)
app.use('/patient', Patient)
app.use('/users', Users)

//app.use(express.static(join(__dirname, '../client/dist')))
const PORT = 5000;
app.listen(PORT)
console.log(`Server is running on port ${PORT}`);