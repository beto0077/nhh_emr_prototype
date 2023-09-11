import axios from "axios";
/*import * as dotenv from "dotenv"

dotenv.config();*/

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSuperAdminsRequest = async () =>
  await axios.get(`${BASE_URL}/superAdmin/superAdmins`);

export const createSuperAdminRequest = async (superAdmin) =>
  await axios.post(`${BASE_URL}/superAdmin/superAdmins`, superAdmin);

export const deleteSuperAdminRequest = async (id) =>
  await axios.delete(`${BASE_URL}/superAdmin/superAdmins/${id}`);

export const getSuperAdminRequest = async (id) =>
  await axios.get(`${BASE_URL}/superAdmin/superAdmins/${id}`);

export const updateSuperAdminRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/superAdmin/superAdmins/${id}`, newFields);

export const loginSuperAdminRequest = async (user) =>
  await axios.post(`${BASE_URL}/superAdmin/login`, user);