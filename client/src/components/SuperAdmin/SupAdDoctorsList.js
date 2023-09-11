import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "./SupAdminNavbar";
import Footer from "../Footer";
import "mdbreact";
import { useDoctorContext } from "../../context/DoctorContext";

function SupAdDoctorsList() {
  const {doctors, loadDoctors, deleteDoctor} = useDoctorContext()
  const [adminLevel, setAdminLevel] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    if(user.adminId !== undefined) {
      setAdminLevel(true)
    }
    loadDoctors();
    setIsLoading(false);
  }, []);

  // Function to handle deletion confirmation and action
  const handleDeleteConfirmation = async (doctor) => {
    if (window.confirm(`Are you sure you want to delete ${doctor.first_name} ${doctor.last_name}?`)) {
      try {
        const response = await deleteDoctor(doctor.doctor_id);
        console.log(response.error)
        if (response.status === 204) {
          alert(`Doctor ${doctor.first_name} ${doctor.last_name} has been deleted.`);
          loadDoctors(); // Refresh the doctor list after deletion
        } else if (response === 404) {
          alert("Doctor not found.");
        } else {
          alert("An error occurred while deleting the doctor.");
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("An error occurred while deleting the doctor.");
      }
    }
  };

  /*return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white" align="center">
        Doctors List
      </h2>
      <h3 className="text-white" align="center">
        Welcome!
      </h3>
      <br />
      <div className="row">
        <div className="col mr-3">
          <div
            className="jumbotron mt-5"
            style={{ backgroundColor: "#e0e0e0" }}
          >
            <h2 className="text-primary">Doctors</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  doctors.map((doctor) => (
                    <tr key={doctor.doctor_id}>
                      <td>
                        <i
                          className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                          aria-hidden="true"
                        ></i>
                        {doctor.doctor_id}
                      </td>
                      <td>{`${doctor.first_name} ${doctor.last_name}`}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          className="mr-2"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/doctorProfile/${doctor.doctor_id}`)
                          }
                        >
                          Profile
                        </Button>
                        <Button
                          variant="outline-secondary"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/editDoctor/${doctor.doctor_id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          hidden={adminLevel}
                          onClick={() => handleDeleteConfirmation(doctor)}
                        >
                          Delete
                        </Button>
                      </td>
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
  );*/
  return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white text-center">
        Doctors List
      </h2>
      <h3 className="text-white text-center">
        Welcome!
      </h3>
      <br />
      <Container>
        <Row>
          <Col>
            <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
              <h2 className="text-primary">Doctors</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? (
                    doctors.map((doctor) => (
                      <tr key={doctor.doctor_id}>
                        <td>
                          <i
                            className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                            aria-hidden="true"
                          ></i>
                          {doctor.doctor_id}
                        </td>
                        <td>{`${doctor.first_name} ${doctor.last_name}`}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            className="mr-2"
                            style={{ marginRight: '10px' }}
                            onClick={() =>
                              navigate(`/doctorProfile/${doctor.doctor_id}`)
                            }
                          >
                            Profile
                          </Button>
                          <Button
                            variant="outline-secondary"
                            style={{ marginRight: '10px' }}
                            onClick={() =>
                              navigate(`/editDoctor/${doctor.doctor_id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-secondary"
                            hidden={adminLevel}
                            onClick={() => handleDeleteConfirmation(doctor)}
                          >
                            Delete
                          </Button>
                        </td>
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default SupAdDoctorsList;