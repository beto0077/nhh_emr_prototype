import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Navber from "./AdminNavbar";
import Footer from "../Footer";
import "mdbreact";
import { useAdminContext } from "../../context/AdminContext";

function AdminProfile() {
  const { getAdmin } = useAdminContext();
  const [adminInfo, setAdminInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_no: "46456456",
    salary: "",
    designation: "",
  });

  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {
      const adminDetails = await getAdmin(params.id);

      setAdminInfo({
        first_name: adminDetails.first_name,
        last_name: adminDetails.last_name,
        email: adminDetails.email,
        address: adminDetails.address,
        salary: adminDetails.salary,
        phone_no: adminDetails.phone_no,
        designation: adminDetails.designation,
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="bg-dark">
      <Navber />
      <br />
      <h2 className="text-white" align="center">
        Admin Profile
      </h2>
      <h3 className="text-white" align="center">
        Welcome!
      </h3>
      <br />
      <div className="row">
        <div className="col">
          <div className="container ml-3">
            <div
              className="jumbotron mt-5"
              style={{ backgroundColor: "#e0e0e0" }}
            >
              <div className="col-sm-6">
                <h2 className="text-primary">Admin Information</h2>
              </div>
              <br />

              <table className="table col-md-6">
                <tbody>
                  <tr>
                    <td> Name</td>
                    <td>
                      {adminInfo.first_name} {adminInfo.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td>{adminInfo.designation}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{adminInfo.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{adminInfo.address}</td>
                  </tr>
                  <tr>
                    <td>Salary Information</td>
                    <td>{adminInfo.salary}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{adminInfo.phone_no}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;