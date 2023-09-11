import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "./SupAdminNavbar";
import Footer from "../Footer";
import "mdbreact";
import { useAdminContext } from "../../context/AdminContext";

function SupAdAdminsList() {
  const {admins, loadAdmins, deleteAdmin} = useAdminContext()

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAdmins();
    setIsLoading(false);
  }, []);

  // Function to handle deletion confirmation and action
  const handleDeleteConfirmation = async (admin) => {
    if (window.confirm(`Are you sure you want to delete ${admin.first_name} ${admin.last_name}?`)) {
      try {
        const response = await deleteAdmin(admin.admin_id);
        console.log(response.error)
        if (response.status === 204) {
          alert(`Admin ${admin.first_name} ${admin.last_name} has been deleted.`);
          loadAdmins(); // Refresh the admin list after deletion
        } else if (response === 404) {
          alert("Admin not found.");
        } else {
          alert("An error occurred while deleting the admin.");
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
        alert("An error occurred while deleting the admin.");
      }
    }
  };

  /*return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white" align="center">
        Admins List
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
            <h2 className="text-primary">Admins</h2>
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
                  admins.map((admin) => (
                    <tr key={admin.admin_id}>
                      <td>
                        <i
                          className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                          aria-hidden="true"
                        ></i>
                        {admin.admin_id}
                      </td>
                      <td>{`${admin.first_name} ${admin.last_name}`}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          className="mr-2"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/adminProfile/${admin.admin_id}`)
                          }
                        >
                          Profile
                        </Button>
                        <Button
                          variant="outline-secondary"
                          style={{marginRight: '10px'}}
                          onClick={() =>
                            navigate(`/editAdmin/${admin.admin_id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleDeleteConfirmation(admin)}
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
        Admins List
      </h2>
      <h3 className="text-white text-center">
        Welcome!
      </h3>
      <br />
      <Container>
        <Row>
          <Col>
            <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
              <h2 className="text-primary">Admins</h2>
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
                    admins.map((admin) => (
                      <tr key={admin.admin_id}>
                        <td>
                          <i
                            className="fab fa-slack-hash fa-2x mr-4 purple p-3 white-text rounded"
                            aria-hidden="true"
                          ></i>
                          {admin.admin_id}
                        </td>
                        <td>{`${admin.first_name} ${admin.last_name}`}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            className="mr-2"
                            style={{ marginRight: '10px' }}
                            onClick={() =>
                              navigate(`/adminProfile/${admin.admin_id}`)
                            }
                          >
                            Profile
                          </Button>
                          <Button
                            variant="outline-secondary"
                            style={{ marginRight: '10px' }}
                            onClick={() =>
                              navigate(`/editAdmin/${admin.admin_id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleDeleteConfirmation(admin)}
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

export default SupAdAdminsList;