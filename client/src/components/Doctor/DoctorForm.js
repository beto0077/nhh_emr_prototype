import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDoctorContext } from "../../context/DoctorContext";

function DoctorForm() {
  const { createDoctor, getDoctor, updateDoctor } = useDoctorContext();
  const [doctor, setDoctor] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    salary: "",
    specialisation: "",
    shift_time: "",
    password: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctor = async () => {
      if (params.id) {
        const loadedDoctor = await getDoctor(params.id);
        setDoctor({
          first_name: loadedDoctor.first_name,
          last_name: loadedDoctor.last_name,
          address: loadedDoctor.address,
          email: loadedDoctor.email,
          salary: loadedDoctor.salary,
          specialisation: loadedDoctor.specialisation,
          shift_time: loadedDoctor.shift_time,
          password: loadedDoctor.password,
        });
      }
    };
    loadDoctor();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateDoctor(params.id, doctor);
    } else {
      await createDoctor(doctor);
    }
    navigate("/actualSuperAdmin");
    setDoctor({
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      salary: "",
      specialisation: "",
      shift_time: "",
      password: "",
    });
  };

  return (
    <div style={{display: 'block', margin: 'auto', width: 400, padding: 30}}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Doctor" : "New Doctor"}
        </h1>
        <Form.Group controlId="formFirstName">
          <Form.Label style={{ display: 'inline-block' , float: 'left'}}>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter first name"
            onChange={handleChange}
            value={doctor.first_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formLastName">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter last name"
            onChange={handleChange}
            value={doctor.last_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formAddress">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
            value={doctor.address}
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={doctor.email}
          />
        </Form.Group>
  
        <Form.Group controlId="formSalary">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            placeholder="Enter salary"
            onChange={handleChange}
            value={doctor.salary}
          />
        </Form.Group>
  
        <Form.Group controlId="formSpecialisation">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Specialisation</Form.Label>
          <Form.Control
            type="text"
            name="specialisation"
            placeholder="Enter specialisation"
            onChange={handleChange}
            value={doctor.specialisation}
          />
        </Form.Group>
  
        <Form.Group controlId="formShiftTime">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Shift Time</Form.Label>
          <Form.Control
            type="text"
            name="shift_time"
            placeholder="Enter shift time"
            onChange={handleChange}
            value={doctor.shift_time}
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={doctor.password}
          />
        </Form.Group>
  
        <Button style={{marginTop: '30px'}} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default DoctorForm;