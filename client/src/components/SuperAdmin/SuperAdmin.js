import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "./SupAdminNavbar";
import Footer from "../Footer";
import { useSuperAdminContext } from "../../context/SuperAdminContext"; // Import the AdminContext

function SuperAdmin() {
  const [superAdminDetails, setSuperAdminDetails] = useState({
    supAdmin_id: "",
    supAdmin_email: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { getSuperAdmin } = useSuperAdminContext(); // Use the AdminContext

  /*useEffect(() => {
    const loadSuperAdmin = async () => {
      try {
        const superAdminData = JSON.parse(sessionStorage.getItem("userData")); //Need to be worked with AdminLogin
      //const adminData = 2
      console.log(superAdminData.superAdminId);

      const details = await getSuperAdmin(superAdminData.superAdminId);

      setSuperAdminDetails({
        supAdmin_id: details.superAdmin_id,
        supAdmin_email: details.email,
      });
      } catch (error) {
        console.log(error)
        navigate(`/unauthorized`)
      }
    };
    loadSuperAdmin();
    setLoading(false);
  }, []);*/

  useEffect(() => {
    const loadSuperAdmin = async () => {
      try {
        const superAdminDataString = sessionStorage.getItem("userData");
        if (!superAdminDataString) {
          throw new Error("User data not found in sessionStorage");
        }
        
        const superAdminData = JSON.parse(superAdminDataString);
        
        if (!superAdminData.superAdminId) {
          throw new Error("superAdminId not found in user data");
        }

        const details = await getSuperAdmin(superAdminData.superAdminId);

        setSuperAdminDetails({
          supAdmin_id: details.superAdmin_id,
          supAdmin_email: details.email,
        });
      } catch (error) {
        console.error(error);
        navigate(`/unauthorized`);
      } finally {
        setLoading(false);
      }
    };

    loadSuperAdmin();
  }, []);

  /*return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white" align="center" style={{ marginTop: "75px" }}>
        Super Admin Home
      </h2>
      <h3 className="text-white" align="center">
        Welcome!
      </h3>
      <br />
      <div className="row">
        <div className="col">
          <div className="container ml-3">
            <div
              className="jumbotron mt-3"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <div className="col-sm-6">
                <h2 className="text-primary">Super Admin Information</h2>
              </div>
              <br />
              <table className="table col-md-6">
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{superAdminDetails.supAdmin_id}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td> {superAdminDetails.supAdmin_email} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3 className="text-white" align="center">
            Create:
          </h3>
          <div>
            <button
              className="bg-slate-300 px-2 py-1 text-black"
              onClick={() => navigate(`/createAdmin`)}
            >
              Admin
            </button>
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
              onClick={() => navigate(`/ManageAdmins`)}
            >
              Admin
            </button>
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
      <br />
      <br />
      <Footer />
    </div>
  );*/
  /*return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white text-center mt-5">Super Admin Home</h2>
      <h3 className="text-white text-center">Welcome!</h3>

      <Container className="mt-5">
        <Row>
          <Col>
            <div className="jumbotron" style={{ backgroundColor: "#e0e0e0" }}>
              <h2 className="text-primary">Super Admin Information</h2>
              <Table striped bordered responsive>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{superAdminDetails.supAdmin_id}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{superAdminDetails.supAdmin_email}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="mt-5">
        <Col>
          <div>
            <h3 className="text-white text-center">Create:</h3>
            <div className="text-center">
              <Button variant="secondary" onClick={() => navigate('/createAdmin')}>
                Admin
              </Button>
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
              <Button variant="secondary" onClick={() => navigate('/ManageAdmins')}>
                Admin
              </Button>
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
  );*/
  return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white text-center mt-5">Super Admin Home</h2>
      <h3 className="text-white text-center">Welcome!</h3>

      <Container className="mt-5">
        <Row>
          <Col>
            <div className="jumbotron" style={{ backgroundColor: '#e0e0e0', borderRadius: '15px' }}>
              <h2 className="text-primary">Super Admin Information</h2>
              <Table striped bordered responsive>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{superAdminDetails.supAdmin_id}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{superAdminDetails.supAdmin_email}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="mt-5">
        <Col>
          <div>
            <h3 className="text-white text-center">Create:</h3>
            <div className="text-center">
              <Button variant="secondary" onClick={() => navigate('/createAdmin')}>
                Admin
              </Button>
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
              <Button variant="secondary" onClick={() => navigate('/ManageAdmins')}>
                Admin
              </Button>
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

export default SuperAdmin;
