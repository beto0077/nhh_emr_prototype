import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Navber from "./DocNavbar";
import Footer from "../Footer";
import "mdbreact";
import { useDoctorContext } from "../../context/DoctorContext";

function DoctorProfile() {
  const { getDoctor, getDoctorPatients } = useDoctorContext();
  const [doctorInfo, setDoctorInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_no: "46456456",
    salary: "",
    shift_time: "",
    specialisation: "",
  });

  const params = useParams();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {
      const doctorDetails = await getDoctor(params.id);
      const patientDetails = await getDoctorPatients(params.id);

      setDoctorInfo({
        first_name: doctorDetails.first_name,
        last_name: doctorDetails.last_name,
        email: doctorDetails.email,
        address: doctorDetails.address,
        salary: doctorDetails.salary,
        shift_time: doctorDetails.shift_time,
        specialisation: doctorDetails.specialisation,
      });

      setPatients(patientDetails);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white" align="center">
        Doctor Profile
      </h2>
      <h3 className="text-white" align="center">
        Welcome!
      </h3>
      <br />
      <div className="row">
        <div className="col">
          <div className="container ml-3">
            <div
              className="jumbotron mt-5"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <div className="col-sm-6">
                <h2 className="text-primary">Doctor Information</h2>
              </div>
              <br />

              <table className="table col-md-6">
                <tbody>
                  <tr>
                    <td> Name</td>
                    <td>
                      {doctorInfo.first_name} {doctorInfo.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td>Specialization</td>
                    <td>{doctorInfo.specialisation}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{doctorInfo.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{doctorInfo.address}</td>
                  </tr>
                  <tr>
                    <td>Salary Information</td>
                    <td>{doctorInfo.salary}</td>
                  </tr>
                  <tr>
                    <td>Shift Time</td>
                    <td>{doctorInfo.shift_time}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col mr-3">
          <div
            className="jumbotron mt-5"
            style={{ backgroundColor: "#e0e0e0" }}
          >
            <h2 className="text-primary">Patients Assigned</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  patients.map((patient) => (
                    <tr key={patient.patient_id}>
                      <td>
                        <i
                          className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                          aria-hidden="true"
                        ></i>
                        {patient.patient_id}
                      </td>
                      <td>{`${patient.first_name} ${patient.last_name}`}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
                      <h4>Loading</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorProfile;

//Suggested by chatGPT
/*
useEffect(() => {
    const doc = JSON.parse(sessionStorage.getItem('userData'));

    const loadData = async () => {
      const doctorDetails = await getDoctor(doc.doctorId);
      const patientDetails = await getDoctorPatients(doc.doctorId);

      setDoctorInfo({
        first_name: doctorDetails.first_name,
        last_name: doctorDetails.last_name,
        email: doctorDetails.email,
        address: doctorDetails.address,
        salary: doctorDetails.salary,
        shift_time: doctorDetails.shift_time,
        specialisation: doctorDetails.specialisation,
      });

      setPatients(patientDetails);
      setIsLoading(false);
    };

    loadData();
  }, []);
*/

/*Back up:
<div className="list-group-flush" style={{ backgroundColor: "#e0e0e0" }}>
              {!isLoading ? patients.map(patient => (
                <div key={patient.patient_id} className="list-group-item" style={{ backgroundColor: "#e0e0e0" }}>
                  <p className="mb-0" style={{ backgroundColor: "#e0e0e0" }}>
                    <i className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded" aria-hidden="true"></i>
                    {patient.first_name} {patient.last_name}
                  </p>
                </div>
              )) : <h4>Loading</h4>}
            </div>
*/

/*Back up 2
<div className="col mr-3">
          <div
            className="jumbotron mt-5"
            style={{ backgroundColor: "#e0e0e0" }}
          >
            <h2 className="text-primary">Patients Assigned</h2>
            <br />
            <div
              className="list-group-flush"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              {!isLoading ? (
                patients.map((patient) => (
                  <div
                    key={patient.patient_id}
                    className="list-group-item"
                    style={{ backgroundColor: "#e0e0e0" }}
                  >
                    <p className="mb-0" style={{ backgroundColor: "#e0e0e0" }}>
                      <i
                        className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                        aria-hidden="true"
                      ></i>
                      {patient.first_name} {patient.last_name}
                    </p>
                    <button
                      className="bg-slate-300 px-2 py-1 text-black"
                      onClick={() => navigate(`/edit/${patient.patient_id}`)}
                    >
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <h4>Loading</h4>
              )}
            </div>
          </div>
        </div>
*/

/*Back up 3

*/
