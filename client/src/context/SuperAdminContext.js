import {createContext, useContext, useState} from 'react'

import { getSuperAdminsRequest, getSuperAdminRequest, createSuperAdminRequest, updateSuperAdminRequest, deleteSuperAdminRequest, loginSuperAdminRequest } from '../api/superAdmin.api';

const SuperAdminContext = createContext();

export const useSuperAdminContext = () => {
    const context = useContext(SuperAdminContext)
    if (context === undefined) {
        throw new Error("useSuperAdminContext must be used within a SuperAdminProvider")
    }

    return context
}

export const SuperAdminProvider =({children}) => {
    const [superAdmins, setSuperAdmins] = useState([])

    async function loadSuperAdmins() {
        const response = await getSuperAdminsRequest();
        setSuperAdmins(response.data)
    }

    const deleteSuperAdmin = async (id) => {
        try {
            const response = await deleteSuperAdminRequest(id)
            setSuperAdmins(superAdmins.filter((superadmin) => superadmin.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const createSuperAdmin = async (superadmin) => {
        try {
            await createSuperAdminRequest(superadmin)
        } catch (error) {
            console.log(error)
        }
    }

    const getSuperAdmin = async (id) => {
        try {
            const response = await getSuperAdminRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateSuperAdmin = async (id, newFields) => {
        try {
            const response = await updateSuperAdminRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const loginSuperAdmin = async (user) => {
        try {
            const response = await loginSuperAdminRequest(user);
            return response.data.token;
        } catch (error) {
            console.log(error.response.status)
            return error.response;
        }
    }

    return (
        <SuperAdminContext.Provider 
            value={{
                superAdmins, loadSuperAdmins, deleteSuperAdmin, createSuperAdmin, getSuperAdmin, updateSuperAdmin, loginSuperAdmin
            }}
        >
            {children}
        </SuperAdminContext.Provider>
    )
}