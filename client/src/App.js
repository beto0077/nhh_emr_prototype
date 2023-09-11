import {Routes, Route} from "react-router-dom"

import './App.css';
import UnauthorizedUser from "./components/UnauthorizedUser";
import WorkInProgress from "./components/WorkInProgress";
import Doctor from './components/Doctor/Doctor';
import Home from './components/Home/Home';
import Navber from './components/Navber/Navber';
import DoctorLogin from './components/Login/DoctorLogin'
import { GlobalContextProvider } from './context/GlobalContextProvider';
import SuperAdmin from "./components/SuperAdmin/SuperAdmin";
import SuperAdminLogin from "./components/Login/SuperAdminLogin";
import SupAdPatientsList from "./components/SuperAdmin/SupAdPatientsList";
import SupAdDoctorsList from "./components/SuperAdmin/SupAdDoctorsList";
import SupAdAdminsList from "./components/SuperAdmin/SupAdAdminsList";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/Login/AdminLogin";
import Patient from "./components/Patient/Patient";
import PatientForm from "./components/Patient/PatientForm";
import DoctorForm from "./components/Doctor/DoctorForm";
import AdminForm from "./components/Admin/AdminForm";
import DoctorProfile from "./components/Doctor/DoctorProfile";
import AdminProfile from "./components/Admin/AdminProfile";


function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/unauthorized" element={<UnauthorizedUser/>}/>
          <Route path="/WIPPage" element={<WorkInProgress/>}/>
          <Route path="/doctors/login" element={<DoctorLogin/>}/>
          <Route path="/administrator/login" element={<AdminLogin/>}/>
          <Route path="/actualDoc" element={<Doctor/>}/>
          <Route path="/createDoctor" element={<DoctorForm/>}/>
          <Route path="/editDoctor/:id" element={<DoctorForm/>}/>
          <Route path="/patientProfile/:id" element={<Patient/>}/>
          <Route path="/doctorProfile/:id" element={<DoctorProfile/>}/>
          <Route path="/adminProfile/:id" element={<AdminProfile/>}/>
          <Route path="/actualAdmin" element={<Admin/>}/>
          <Route path="/createAdmin" element={<AdminForm/>}/>
          <Route path="/editAdmin/:id" element={<AdminForm/>}/>
          <Route path="/createPatient" element={<PatientForm/>}/>
          <Route path="/editPatient/:id" element={<PatientForm/>}/>
          <Route path="/superAdministrator/login" element={<SuperAdminLogin/>}/>
          <Route path="/actualSuperAdmin" element={<SuperAdmin/>}/>
          <Route path="/ManagePatients" element={<SupAdPatientsList/>}/>
          <Route path="/ManageDoctors" element={<SupAdDoctorsList/>}/>
          <Route path="/ManageAdmins" element={<SupAdAdminsList/>}/>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}

/*function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<AdminLogin/>}/>
          <Route path="/actualAdmin" element={<Admin/>}/>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}*/

export default App;
