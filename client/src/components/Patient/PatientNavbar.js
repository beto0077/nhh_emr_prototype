//Has to be fixed later, I just copy the navbar of Doctors for test the patient home page

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import '../Navber/Navber.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function PatientNavbar() {
  const [userDirection, setUserDirection] = useState('')
  const navigate = useNavigate();
  /*const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollpos > currentScrollPos;
    setPrevScrollpos(currentScrollPos);
    setVisible(isVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);*/
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
    } else if(user.adminId !== undefined) {
      const dirtn = '/ManagePatients'
      setUserDirection(dirtn)
    }
  }, [])

  const handleLogout = () => {
    // Clear session storage and navigate to the main page
    sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <Navbar className="navbar" bg="success" text="white" var="lg">
        <Navbar.Brand style={{ color: "white" }}>New Hope Hospital Ltd</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" href={userDirection} >Home</Nav.Link>
            
            <Nav.Link className="text-white" onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default PatientNavbar;

/*
<Nav.Link className="text-white" href="/doctors/login/doctor_home">Doctor</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/about">About</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/gallery">Gallery</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/contact">Contact Us</Nav.Link>
*/