import axios from "axios";
/*import * as dotenv from "dotenv"

dotenv.config();*/

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAdminsRequest = async () =>
  await axios.get(`${BASE_URL}/admin/admins`);

export const createAdminRequest = async (admin) =>
  await axios.post(`${BASE_URL}/admin/admins`, admin);

export const deleteAdminRequest = async (id) =>
  await axios.delete(`${BASE_URL}/admin/admins/${id}`);

export const getAdminRequest = async (id) =>
  await axios.get(`${BASE_URL}/admin/admins/${id}`);

export const updateAdminRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/admin/admins/${id}`, newFields);

export const assignDoctorRequest = async (assignment) =>
  await axios.post(`${BASE_URL}/admin/assignDoctor`, assignment);

export const loginAdminRequest = async (user) =>
  await axios.post(`${BASE_URL}/admin/login`, user);