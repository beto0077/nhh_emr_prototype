import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import Navber from "./SupAdminNavbar";
import Footer from "../Footer";
import "mdbreact";
import { usePatientContext } from "../../context/PatientContext";

function SupAdPatientsList() {
  const { patients, loadPatients, deletePatient } = usePatientContext();
  const [adminLevel, setAdminLevel] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    console.log(user);
    if (user.adminId !== undefined) {
      setAdminLevel(true);
    }
    loadPatients();
    setIsLoading(false);
  }, []);

  // Function to handle deletion confirmation and action
  const handleDeleteConfirmation = async (patient) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${patient.first_name} ${patient.last_name}?`
      )
    ) {
      try {
        const response = await deletePatient(patient.patient_id);
        console.log(response.error);
        if (response.status === 204) {
          alert(
            `Patient ${patient.first_name} ${patient.last_name} has been deleted.`
          );
          loadPatients(); // Refresh the patient list after deletion
        } else if (response === 404) {
          alert("Patient not found.");
        } else {
          alert("An error occurred while deleting the patient.");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("An error occurred while deleting the patient here.");
      }
    }
  };

  /*return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white" align="center">
        Patients List
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
            <h2 className="text-primary">Patients</h2>
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
                      <td>
                        <Button
                          variant="outline-secondary"
                          className="mr-2"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/patientProfile/${patient.patient_id}`)
                          }
                        >
                          Profile
                        </Button>
                        <Button
                          variant="outline-secondary"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/editPatient/${patient.patient_id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          hidden={adminLevel}
                          onClick={() => handleDeleteConfirmation(patient)}
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
  /*return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white text-center">Patients List</h2>
      <h3 className="text-white text-center">Welcome!</h3>
      <br />
      <Container>
        <Row>
          <Col>
            <div
              className="jumbotron mt-5 mb-5"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <h2 className="text-primary">Patients</h2>
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
                        <td>
                          <Button
                            variant="outline-secondary"
                            className="mr-2"
                            style={{ marginRight: "10px" }}
                            onClick={() =>
                              navigate(`/patientProfile/${patient.patient_id}`)
                            }
                          >
                            Profile
                          </Button>
                          <Button
                            variant="outline-secondary"
                            style={{ marginRight: "10px" }}
                            onClick={() =>
                              navigate(`/editPatient/${patient.patient_id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-secondary"
                            hidden={adminLevel}
                            onClick={() => handleDeleteConfirmation(patient)}
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
  );*/
  return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white text-center">Patients List</h2>
      <h3 className="text-white text-center">Welcome!</h3>
      <br />
      <Container>
        <Row>
          <Col>
            <div className="jumbotron mt-5 mb-5">
              <Card style={{ backgroundColor: "#e0e0e0" }} className="rounded">
                <Card.Body>
                  <h2 className="text-primary">Patients</h2>
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
                            <td>
                              <Button
                                variant="outline-secondary"
                                className="mr-2"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  navigate(`/patientProfile/${patient.patient_id}`)
                                }
                              >
                                Profile
                              </Button>
                              <Button
                                variant="outline-secondary"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  navigate(`/editPatient/${patient.patient_id}`)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-secondary"
                                hidden={adminLevel}
                                onClick={() => handleDeleteConfirmation(patient)}
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
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default SupAdPatientsList;
