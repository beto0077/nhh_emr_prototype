import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navber from '../Navber/Navber';
import { useDoctorContext } from '../../context/DoctorContext';

function DoctorLogin() {
  const { loginDoctor } = useDoctorContext(); // Access the loginDoctor function from DoctorContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  const navigate = useNavigate();

  const onChange = e => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const token = await loginDoctor(user); // Call the loginDoctor function
      //console.log('test:')
      //console.log(token.status)
      //console.log(token.data.message)
      if(token.status === 401) {
        console.log(token.data.message)
        setErrorAlert(token.data.message);
      } else if(token.status === 404){
        console.log(token.data.message)
        setErrorAlert(token.data.message);
      } else if(token.status === 500){
        console.log("Something is wrong with the batabase")
        setErrorAlert("Something is wrong with the database");
      } else {
        const decodedToken = jwt_decode(token);
        sessionStorage.setItem('usertoken', token);
        sessionStorage.setItem('userData', JSON.stringify(decodedToken));
        navigate("/actualDoc");
      }
    } catch (error) {
      console.log(error.message);
      setErrorAlert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="body">
      <Navber />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal btn-rg" style={{ marginTop: '100px' }}>
                Please sign in as Doctor
              </h1>
              <div className="form-group btn-rg">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group btn-rg">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block mb-5"
                style={{marginTop:'2rem'}}
              >
                Sign in
              </button>
            </form>
            {errorAlert && (
              <Alert variant="danger" onClose={() => setErrorAlert('')} dismissible>
                {errorAlert}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default DoctorLogin;