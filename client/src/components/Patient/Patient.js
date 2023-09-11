import React, { useState, useEffect } from 'react';
import Navber from './PatientNavbar';
import Footer from '../Footer';
import doc_img from './doctor1.jpg';
import 'mdbreact';
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap';
import {useParams} from 'react-router-dom'

import {usePatientContext} from '../../context/PatientContext';

function Patient() {
    const {getPatient, getPatientDoctor} = usePatientContext();
  const [patientInfo, setPatientInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone_no: '',
    disease: '',
    /*doctor_firstname: '',
    doctor_lastname: '',
    specialist: '',*/
  });

  const [docInfo, setDocInfo] = useState([])

  const params = useParams();
  useEffect(() => {
    const loadPatient = async () => {
        if(params.id) {
            const details = await getPatient(params.id)
            console.log(details)
            setPatientInfo((prevInfo) => ({
                ...prevInfo,
                first_name: details.first_name,
                last_name: details.last_name,
                address: details.address,
                email: details.email,
                phone_no: details.phone_no,
                disease: details.disease,
            })); 
        }
    };
    loadPatient();
    const loadPatientDoctor = async () => {
        const details = await getPatientDoctor(params.id);
        /*console.log('DocDetailshere')
        console.log(details[0]);
        console.log('Now here')
        setDocInfo(details[0]);
        console.log(docInfo[0])
        console.log('Done')*/
        if (details.length == 0) {

          console.log("Maybe here...")
          const dumyDetails = ([{
            "doctor_firstname": 'No Doctor Assigned',
            "doctor_lastname": '',
            "specialisation": '',
          }])
          console.log(dumyDetails[0])
          setDocInfo(dumyDetails[0])
        } else {
          console.log('Now here now')
            setDocInfo(details[0]);
            console.log(docInfo)
            console.log('Done')
        }
    }
    loadPatientDoctor();
    /*axios
      .get('/patient/details', {
        headers: {
          authorization: sessionStorage.getItem('usertoken'),
        },
      })
      .then((res) => {
        const details = res.data[0];
        setPatientInfo((prevInfo) => ({
          ...prevInfo,
          first_name: details.first_name,
          last_name: details.last_name,
          address: details.address,
          email: details.email,
          phone_no: details.phone_no,
          disease: details.disease,
        }));
      });

    axios
      .get('/patient/doctor', {
        headers: {
          authorization: sessionStorage.getItem('usertoken'),
        },
      })
      .then((res) => {
        if (res.data.length !== 0) {
          const details = res.data[0];
          setPatientInfo((prevInfo) => ({
            ...prevInfo,
            doctor_firstname: details.doctor_firstname,
            doctor_lastname: details.doctor_lastname,
            specialist: details.specialisation,
          }));
        } else {
          setPatientInfo((prevInfo) => ({
            ...prevInfo,
            doctor_firstname: 'No Doctor Assigned',
          }));
        }
      });*/
  }, []);

  /*return (
    <div className="bg-dark">
      <Navber/>
      <h2 className="text-white my-3" align="center" style={{marginTop: '75px'}}>
        Patient Home
      </h2>
      <h3 className="text-white my-3" align="center">
        Welcome!
      </h3>
      <Row>
        <Col>
          <Row>
            <div className="col">
              <div className="container ml-3">
                <div className="jumbotron mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                  <div className="col-sm-6">
                    <h2 className="text-primary">Patient Information</h2>
                  </div>
                  <br />
                  <table className="table col-md-6">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>
                          {patientInfo.first_name} {patientInfo.last_name}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{patientInfo.email}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{patientInfo.address}</td>
                      </tr>
                      <tr>
                        <td>Phone number</td>
                        <td>{patientInfo.phone_no}</td>
                      </tr>
                      <tr>
                        <td>Disease</td>
                        <td>{patientInfo.disease}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Row>
        </Col>
        <Col>
          <div className="col ">
            <br />
            <br />
            <div
              className="card card-cascade narrower mr-3"
              style={{ backgroundColor: '#e0e0e0' }}
            >
              <h2 className="text-primary card-body card-body-cascade text-center mt-3  ">
                Doctor Information
              </h2>
              <Image
                width={520}
                height={760}
                className="img-responsive center-block my-5"
                src={doc_img}
                thumbnail
              />
              <div className="card-body card-body-cascade text-center">
                <h4 className="card-title">
                  <strong>
                    {docInfo.doctor_firstname} {docInfo.doctor_lastname}
                  </strong>
                </h4>
                <h5 className="blue-text pb-2">
                  <strong>{docInfo.specialisation}</strong>
                </h5>
                <p className="card-text">The doctor currently assigned to the patient</p>
              </div>
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
      <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
        Patient Home
      </h2>
      <h3 className="text-white my-3 text-center">
        Welcome!
      </h3>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="container ml-3">
                  <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                    <Card.Body>
                      <h2 className="text-primary">Patient Information</h2>
                      <Table striped bordered responsive>
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>
                              {patientInfo.first_name} {patientInfo.last_name}
                            </td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{patientInfo.email}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>{patientInfo.address}</td>
                          </tr>
                          <tr>
                            <td>Phone number</td>
                            <td>{patientInfo.phone_no}</td>
                          </tr>
                          <tr>
                            <td>Disease</td>
                            <td>{patientInfo.disease}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <div className="col mt-5 mb-4">
              <Card className="card-cascade narrower" style={{ backgroundColor: '#e0e0e0' }}>
                <Card.Body>
                  <h2 className="text-primary card-body-cascade text-center mt-3">
                    Doctor Information
                  </h2>
                  <Image
                    width={520}
                    height={760}
                    className="img-responsive center-block my-5"
                    src={doc_img}
                    thumbnail
                  />
                  <div className="card-body card-body-cascade text-center">
                    <h4 className="card-title">
                      <strong>
                        {docInfo.doctor_firstname} {docInfo.doctor_lastname}
                      </strong>
                    </h4>
                    <h5 className="blue-text pb-2">
                      <strong>{docInfo.specialisation}</strong>
                    </h5>
                    <p className="card-text">The doctor currently assigned to the patient</p>
                  </div>
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

export default Patient;