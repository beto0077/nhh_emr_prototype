import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAdminContext } from '../../context/AdminContext';

function AdminForm() {
  const { createAdmin, getAdmin, updateAdmin } = useAdminContext();
  const [admin, setAdmin] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    designation: "",
    password: "",
    address: "",
    salary: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdmin = async () => {
      if (params.id) {
        const loadedAdmin = await getAdmin(params.id);
        setAdmin({
          first_name: loadedAdmin.first_name,
          last_name: loadedAdmin.last_name,
          email: loadedAdmin.email,
          phone_no: loadedAdmin.phone_no,
          designation: loadedAdmin.designation,
          password: loadedAdmin.password,
          address: loadedAdmin.address,
          salary: loadedAdmin.salary,
        });
      }
    };
    loadAdmin();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateAdmin(params.id, admin);
    } else {
      await createAdmin(admin);
    }
    navigate("/actualSuperAdmin");
    setAdmin({
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      designation: "",
      password: "",
      address: "",
      salary: "",
    });
  };

  return (
    <div style={{display: 'block', margin: 'auto', width: 400, padding: 30}}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Admin" : "New Admin"}
        </h1>
        <Form.Group controlId="formFirstName">
          <Form.Label style={{ display: 'inline-block' , float: 'left'}}>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter first name"
            onChange={handleChange}
            value={admin.first_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formLastName">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter last name"
            onChange={handleChange}
            value={admin.last_name}
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={admin.email}
          />
        </Form.Group>
  
        <Form.Group controlId="formPhoneNo">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_no"
            placeholder="Enter phone number"
            onChange={handleChange}
            value={admin.phone_no}
          />
        </Form.Group>
  
        <Form.Group controlId="formDesignation">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Designation</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            placeholder="Enter designation"
            onChange={handleChange}
            value={admin.designation}
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={admin.password}
          />
        </Form.Group>
  
        <Form.Group controlId="formAddress">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
            value={admin.address}
          />
        </Form.Group>
  
        <Form.Group controlId="formSalary">
          <Form.Label style={{ display: 'inline-block' , float: 'left', marginTop: '15px'}}>Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            placeholder="Enter salary"
            onChange={handleChange}
            value={admin.salary}
          />
        </Form.Group>
  
        <Button style={{marginTop: '30px'}} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default AdminForm;