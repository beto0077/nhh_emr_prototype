import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import "../Navber/Navber.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function SupAdminNavbar() {
  /*const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  // Adds an event listener when the component is mounted.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener when the component is unmounted.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hide or show the menu.
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollpos > currentScrollPos;

    setPrevScrollpos(currentScrollPos);
    setVisible(isVisible);
  };*/

  const [userDirection, setUserDirection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userDataString = sessionStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in sessionStorage");
      }
      const user = JSON.parse(userDataString);
      if (user.superAdminId !== undefined) {
        const dirtn = "/actualSuperAdmin";
        setUserDirection(dirtn);
      } else if (user.adminId !== undefined) {
        const dirtn = "/actualAdmin";
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
      <Navbar className="navbar" bg="success" text="white" expand="lg">
        <Navbar.Brand style={{ color: "white" }}>
          New Hope Hospital Ltd
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" href={userDirection}>
              Home
            </Nav.Link>
            
            <Nav.Link className="text-white" onClick={handleLogout}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SupAdminNavbar;

/*
<Nav.Link
              className="text-white"
              href="/administrator/login/admin_home"
            >
              Admin
            </Nav.Link>
            <Nav.Link className="text-white" href="/administrator/login/about">
              About
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="/administrator/login/gallery"
            >
              Gallery
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="/administrator/login/contact"
            >
              Contact Us
            </Nav.Link>
*/