import {createContext, useContext, useState} from 'react'

import { getAdminRequest, getAdminsRequest, createAdminRequest, updateAdminRequest, deleteAdminRequest, assignDoctorRequest, loginAdminRequest } from '../api/admin.api';

const AdminContext = createContext();

export const useAdminContext = () => {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error("useAdminContext must be used within a AdminProvider")
    }

    return context
}

export const AdminProvider =({children}) => {
    const [admins, setAdmins] = useState([])

    async function loadAdmins() {
        const response = await getAdminsRequest()
        setAdmins(response.data)
    }

    const deleteAdmin = async (id) => {
        try {
            const response = await deleteAdminRequest(id)
            setAdmins(admins.filter((admin) => admin.id !== id))
            return response
        } catch (error) {
            console.log(error.response.status)
            return error.response.status
        }
    }

    const createAdmin = async (admin) => {
        try {
            await createAdminRequest(admin)
        } catch (error) {
            console.log(error)
        }
    }

    const getAdmin = async (id) => {
        try {
            const response = await getAdminRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateAdmin = async (id, newFields) => {
        try {
            const response = await updateAdminRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const assignDoctor = async (assignment) => {
        try {
          const response = await assignDoctorRequest(assignment);
          return response;
        } catch (error) {
          console.log(error);
          return error.response;
        }
      };

    const loginAdmin = async (user) => {
        try {
            const response = await loginAdminRequest(user);
            return response.data.token;
        } catch (error) {
            console.log(error.response.status)
            return error.response;
        }
    }

    return (
        <AdminContext.Provider 
            value={{
                admins, loadAdmins, deleteAdmin, createAdmin, getAdmin, updateAdmin, assignDoctor, loginAdmin
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}