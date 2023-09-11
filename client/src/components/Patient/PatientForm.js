import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePatientContext } from "../../context/PatientContext";

function PatientForm() {
  const { createPatient, getPatient, updatePatient } = usePatientContext();
  const [userDirection, setUserDirection] = useState('')
  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_no: "",
    password: "",
    disease: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData")); //mod
    console.log(user)
    console.log(user.superAdminId)
    console.log(user.doctorId)
    if(user.superAdminId !== undefined) {
      const dirtn = '/ManagePatients'
      setUserDirection(dirtn)
    } else if (user.doctorId !== undefined) {
      const dirtn = '/actualDoc'
      setUserDirection(dirtn)
    }
  }, [])

  useEffect(() => {

    console.log("Updated direction")
    console.log(userDirection)
  }, [userDirection])

  useEffect(() => {
    const loadPatient = async () => {
      if (params.id) {
        const loadedPatient = await getPatient(params.id);
        setPatient({
          first_name: loadedPatient.first_name,
          last_name: loadedPatient.last_name,
          address: loadedPatient.address,
          email: loadedPatient.email,
          phone_no: loadedPatient.phone_no,
          password: loadedPatient.password,
          disease: loadedPatient.disease,
        });
      }
    };
    loadPatient();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updatePatient(params.id, patient);
    } else {
      await createPatient(patient);
    }
    /*navigate("/actualSuperAdmin");*/
    navigate(userDirection);
    setPatient({
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      phone_no: "",
      password: "",
      disease: "",
    });
  };

  return (
    <div style={{display: 'block', margin: 'auto', width: 400, padding: 30}}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Patient" : "New Patient"}
        </h1>
        <Form.Group controlId="formFirstName">
          <Form.Label style={{ display: 'inline-block' , float: 'left'}}>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter first name"
            onChange={handleChange}
            value={patient.first_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formLastName">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter last name"
            onChange={handleChange}
            value={patient.last_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formAddress">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
            value={patient.address}
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={patient.email}
          />
        </Form.Group>
  
        <Form.Group controlId="formPhoneNo">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_no"
            placeholder="Enter phone number"
            onChange={handleChange}
            value={patient.phone_no}
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={patient.password}
          />
        </Form.Group>
  
        <Form.Group controlId="formDisease">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Disease</Form.Label>
          <Form.Control
            type="text"
            name="disease"
            placeholder="Enter disease"
            onChange={handleChange}
            value={patient.disease}
          />
        </Form.Group>
  
        <Button style={{marginTop: '30px'}} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
  
}

export default PatientForm;