import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  /*return (
    <footer className="page-footer font-small pt-4 default-color">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase font-weight-bold">Contact us:</h5>
            <p>EMAIL: lifescapehospital@gmail.com</p>
            <p>Phone no: 7686968650</p>
          </div>
          <hr className="clearfix w-100 d-md-none pb-3"/>
          <div className="col-md-6 mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Address:</h5>
            <p>47/77 Banerjee Para Kolkata-700031</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 default-color-dark">
        © 2019 Copyright: <span>lifescaspanehospitalltd.com</span>
      </div>
    </footer>
  );*/
  return (
    <footer className="page-footer font-small pt-4 default-color">
      <Container className="text-center text-md-left">
        <Row>
          <Col md="6" className="mt-md-0 mt-3">
            <h5 className="text-uppercase font-weight-bold">Contact us:</h5>
            <p>Email: nhhospital@gmail.com</p>
            <p>Phone no: 6575857549</p>
          </Col>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <Col md="6" className="mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Address:</h5>
            <p>47/77 Central Asgard-700031</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3 default-color-dark">
        © 2023 Copyright: <span>nhhospitalltd.com</span>
      </div>
    </footer>
  );
}

export default Footer;