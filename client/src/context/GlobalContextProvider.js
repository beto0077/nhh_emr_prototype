import React from "react";

import { SuperAdminProvider } from "./SuperAdminContext";
import { DoctorProvider } from "./DoctorContext";
import { PatientProvider } from "./PatientContext";
import { AdminProvider } from "./AdminContext";

export const GlobalContextProvider = ({ children }) => {
  return (
    <SuperAdminProvider>
      <AdminProvider>
        <DoctorProvider>
            <PatientProvider>
                {children}
            </PatientProvider>
        </DoctorProvider>
      </AdminProvider>
    </SuperAdminProvider>
  );
};
