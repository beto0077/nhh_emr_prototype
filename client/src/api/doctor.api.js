import axios from "axios";
/*import * as dotenv from "dotenv"

dotenv.config();*/

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getDoctorsRequest = async () =>
  await axios.get(`${BASE_URL}/doctor/doctors`);

export const createDoctorRequest = async (doctor) =>
  await axios.post(`${BASE_URL}/doctor/doctors`, doctor);

export const deleteDoctorRequest = async (id) =>
  await axios.delete(`${BASE_URL}/doctor/doctors/${id}`);

export const getDoctorRequest = async (id) =>
  await axios.get(`${BASE_URL}/doctor/doctors/${id}`);

export const updateDoctorRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/doctor/doctors/${id}`, newFields);

export const loginDoctorRequest = async (user) =>
  await axios.post(`${BASE_URL}/doctor/login`, user);

export const getDoctorPatientsRequest = async (user) =>
  await axios.get(`${BASE_URL}/doctor/doctorPatients/${user}`);