import {createContext, useContext, useState} from 'react'

import { getDoctorRequest, deleteDoctorRequest,createDoctorRequest, getDoctorsRequest, updateDoctorRequest, loginDoctorRequest, getDoctorPatientsRequest } from '../api/doctor.api';

const DoctorContext = createContext();

export const useDoctorContext = () => {
    const context = useContext(DoctorContext)
    if (context === undefined) {
        throw new Error("useDoctorContext must be used within a DoctorProvider")
    }

    return context
}

export const DoctorProvider =({children}) => {
    const [doctors, setDoctors] = useState([])

    async function loadDoctors() {
        const response = await getDoctorsRequest()
        setDoctors(response.data)
    }

    const deleteDoctor = async (id) => {
        try {
            const response = await deleteDoctorRequest(id)
            setDoctors(doctors.filter((doctor) => doctor.id !== id))
            return response;
        } catch (error) {
            console.log(error.response.status)
            return error.response.status;
        }
    }

    const createDoctor = async (doctor) => {
        try {
            await createDoctorRequest(doctor)
        } catch (error) {
            console.log(error)
        }
    }

    const getDoctor = async (id) => {
        try {
            const response = await getDoctorRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateDoctor = async (id, newFields) => {
        try {
            const response = await updateDoctorRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const loginDoctor = async (user) => {
        try {
          const response = await loginDoctorRequest(user);
          return response.data.token;
        } catch (error) {
            console.log(error.response.status)
            return error.response;
        }
      }
      
    const getDoctorPatients = async (user) => {
        try {
            const response = await getDoctorPatientsRequest(user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DoctorContext.Provider 
            value={{
                doctors, loadDoctors, deleteDoctor, createDoctor, getDoctor, updateDoctor, loginDoctor, getDoctorPatients
            }}
        >
            {children}
        </DoctorContext.Provider>
    )
}



