import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import '../Navber/Navber.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function DocNavbar() {
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

  const navigate = useNavigate();
  const [userDirection, setUserDirection] = useState("");

  useEffect(() => {
    try {
      const userDataString = sessionStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in sessionStorage");
      }
      const user = JSON.parse(userDataString);
      if (user.superAdminId !== undefined || user.adminId !== undefined) {
        const dirtn = "/ManageDoctors";
        setUserDirection(dirtn);
      } else if (user.doctorId !== undefined) {
        const dirtn = "/";
        setUserDirection(dirtn);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleLogout = () => {
    // Clear session storage and navigate to the main page
    sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <Navbar className="navbar" bg="primary" text="white" expand="lg">
        <Navbar.Brand style={{ color: "white" }}>New Hope Hospital Ltd</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" href={userDirection}>Home</Nav.Link>
            <Nav.Link className="text-white" onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default DocNavbar;

/*
<Nav.Link className="text-white" href="/actualDoc">Doctor</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/about">About</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/gallery">Gallery</Nav.Link>
            <Nav.Link className="text-white" href="/doctors/login/contact">Contact Us</Nav.Link>
*/