import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import Form from 'react-bootstrap/Form';
import Navber from "./AdminNavbar";
import Footer from "../Footer";
import { useAdminContext } from "../../context/AdminContext"; // Import the AdminContext
import { useDoctorContext } from "../../context/DoctorContext"; // Import the DoctorContext
import { usePatientContext } from "../../context/PatientContext"; // Import the PatientContext

function Admin() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    admin_first_name: "",
    admin_last_name: "",
    admin_email: "",
    admin_address: "",
    admin_phone_no: "",
    admin_designation: "",
    admin_salary: "",
  });

  const [assignment, setAssignment] = useState({
    patient_id: "",
    doctor_id: "",
  });

  const [newDoctor, setNewDoctor] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    salary: "",
    specialisation: "",
    shift_time: "",
  });

  const [loading, setLoading] = useState(true);
  const [mssgAlert, setMssgAlert] = useState('');
  const [mssgType, setMssgType] = useState('');

  const { assignDoctor, getAdmin } = useAdminContext(); // Use the AdminContext
  const { doctors, loadDoctors } = useDoctorContext(); // Use the DoctorContext
  const { patients, loadPatients } = usePatientContext();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name in adminDetails) {
      setAdminDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else if (name in assignment) {
      setAssignment((prevAssignment) => ({
        ...prevAssignment,
        [name]: value,
      }));
    } else if (name in newDoctor) {
      setNewDoctor((prevDoctor) => ({
        ...prevDoctor,
        [name]: value,
      }));
    }
  };

  const onSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await assignDoctor(assignment); // Use the assignDoctor function from the context
      console.log(response.status);
      console.log(response.data.message);
      if(response.status === 400) {
        console.log(response.data.message)
        setMssgAlert(response.data.message);
        setMssgType('danger');
      } else if(response.status === 500) {
        console.log(response.data.message)
        setMssgAlert('Something is wrong with the database');
        setMssgType('danger');
      } else if(response.status === 200) {
        console.log(response.data.message)
        setMssgAlert(response.data.message);
        setMssgType('success');
      }
      setAssignment({
        patient_id: "",
        doctor_id: "",
      })
    } catch (error) {
      console.log(error.message);
      setMssgAlert("An error occurred. Please try again later.");
      setMssgType('danger');
    }
  };

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const adminDataString = sessionStorage.getItem("userData");
        if (!adminDataString) {
          throw new Error("User data not found in sessionStorage");
        }

        const adminData = JSON.parse(adminDataString);

        if (!adminData.adminId) {
          throw new Error("adminId not found in user data");
        }

        const details = await getAdmin(adminData.adminId);

        setAdminDetails({
          admin_first_name: details.first_name,
          admin_last_name: details.last_name,
          admin_email: details.email,
          admin_address: details.address,
          admin_phone_no: details.phone_no,
          admin_designation: details.designation,
          admin_salary: details.salary,
        });
      } catch (error) {
        console.error(error);
        navigate(`/unauthorized`);
      } finally {
        setLoading(false);
      }
    };
    loadAdmin();
    loadDoctors();
    loadPatients();
  }, []);

  /*return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white" align="center" style={{ marginTop: "75px" }}>
        Employee Home
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
                <h2 className="text-primary">Employee Information</h2>
              </div>
              <br />
              <table className="table col-md-6">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      {adminDetails.admin_first_name}{" "}
                      {adminDetails.admin_last_name}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td> {adminDetails.admin_email} </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td> {adminDetails.admin_address} </td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td> {adminDetails.admin_phone_no} </td>
                  </tr>
                  <tr>
                    <td>Designation </td>
                    <td> {adminDetails.admin_designation} </td>
                  </tr>
                  <tr>
                    <td>Salary</td>
                    <td> {adminDetails.admin_salary} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col mb-1">
          <div className="container mr-3">
            <div
              className="jumbotron mt-5"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <form noValidate onSubmit={onSubmit1}>
                <div className="col-sm-6">
                  <h2 className="text-primary">Assign Patient to Doctor</h2>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="patient_id">Patient</label>
                  <Form.Select
                    name="patient_id"
                    value={assignment.patient_id}
                    onChange={onChange}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.patient_id} value={patient.patient_id}>
                        {patient.patient_id} | {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="form-group">
                  <label htmlFor="doctor_id">Doctor</label>
                  <Form.Select
                    name="doctor_id"
                    value={assignment.doctor_id}
                    onChange={onChange}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {doctor.doctor_id} | {doctor.first_name} {doctor.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Assign
                </button>
              </form>
              {mssgAlert && (
              <Alert variant={mssgType} onClose={() => setMssgAlert('')} dismissible>
                {mssgAlert}
              </Alert>
            )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div>
            <div>
              <h3 className="text-white" align="center">
                Create:
              </h3>
              <div>
                <button
                  className="bg-slate-300 px-2 py-1 text-black"
                  onClick={() => navigate(`/createDoctor`)}
                >
                  Doctor
                </button>
                <button
                  className="bg-slate-300 px-2 py-1 text-black"
                  onClick={() => navigate(`/createPatient`)}
                >
                  Patient
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-white" align="center">
                Update or Delete:
              </h3>
              <div>
                <button
                  className="bg-slate-300 px-2 py-1 text-black"
                  onClick={() => navigate(`/ManageDoctors`)}
                >
                  Doctor
                </button>
                <button
                  className="bg-slate-300 px-2 py-1 text-black"
                  onClick={() => navigate(`/ManagePatients`)}
                >
                  Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );*/
  return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white text-center mt-5">Employee Home</h2>
      <h3 className="text-white text-center">Welcome!</h3>

      <Container className="mt-5">
        <Row>
          <Col>
            <div className="jumbotron" style={{ backgroundColor: "#e0e0e0" }}>
              <h2 className="text-primary">Employee Information</h2>
              <Table striped bordered responsive>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      {adminDetails.admin_first_name} {adminDetails.admin_last_name}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{adminDetails.admin_email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{adminDetails.admin_address}</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>{adminDetails.admin_phone_no}</td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td>{adminDetails.admin_designation}</td>
                  </tr>
                  <tr>
                    <td>Salary</td>
                    <td>{adminDetails.admin_salary}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>

          <Col>
            <div className="jumbotron" style={{ backgroundColor: "#e0e0e0" }}>
              <form noValidate onSubmit={onSubmit1}>
                <h2 className="text-primary">Assign Patient to Doctor</h2>
                <Form.Group>
                  <Form.Label htmlFor="patient_id">Patient</Form.Label>
                  <Form.Select
                    name="patient_id"
                    value={assignment.patient_id}
                    onChange={onChange}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.patient_id} value={patient.patient_id}>
                        {patient.patient_id} | {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="doctor_id">Doctor</Form.Label>
                  <Form.Select
                    name="doctor_id"
                    value={assignment.doctor_id}
                    onChange={onChange}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {doctor.doctor_id} | {doctor.first_name} {doctor.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Assign
                </Button>
              </form>
              {mssgAlert && (
                <Alert variant={mssgType} onClose={() => setMssgAlert('')} dismissible>
                  {mssgAlert}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="mt-5">
        <Col>
          <div>
            <h3 className="text-white text-center">Create:</h3>
            <div className="text-center">
              <Button variant="secondary" onClick={() => navigate('/createDoctor')}>
                Doctor
              </Button>
              <Button variant="secondary" onClick={() => navigate('/createPatient')}>
                Patient
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col>
          <div>
            <h3 className="text-white text-center">Update or Delete:</h3>
            <div className="text-center">
              <Button variant="secondary" onClick={() => navigate('/ManageDoctors')}>
                Doctor
              </Button>
              <Button variant="secondary" onClick={() => navigate('/ManagePatients')}>
                Patient
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Footer />
    </div>
  );
}

export default Admin;

/*
<div
              className="jumbotron mt-5"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <form noValidate onSubmit={onSubmit1}>
                <div className="col-sm-6">
                  <h2 className="text-primary">Assign Patient to Doctor</h2>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="name">Patient ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="patient_id"
                    placeholder="Enter Patient ID"
                    value={assignment.patient_id}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Doctor ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="doctor_id"
                    placeholder="Enter Doctor ID"
                    value={assignment.doctor_id}
                    onChange={onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  {" "}
                  Assign{" "}
                </button>
              </form>
            </div>
*/
