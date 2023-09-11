import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function WorkInProgress() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleOK = async() => {
    setShow(false)
    navigate("/")
  }

  /*return (
    <>
      <Alert show={show} variant="danger">
        <Alert.Heading>Ooops! an error occured!</Alert.Heading>
        <p>
        It seems that you are not authorized to view this page, please press "OK" and log in to view this page correctly.
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => handleOK()} variant="outline-danger">
            OK
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );*/
  useEffect(() => {
    const handleResize = () => {
      // Update the height of the alert container based on window height
      const newHeight = Math.min(window.innerHeight * 0.8, 600); // You can adjust the maximum height as needed
      setAlertHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the height

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [alertHeight, setAlertHeight] = useState(window.innerHeight * 0.8);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#343434' }}>
      <Alert show={show} variant="info" style={{ maxWidth: '400px', width: '90%', maxHeight: alertHeight, overflowY: 'auto' }}>
        <Alert.Heading>Element in the process of creation...</Alert.Heading>
        <p>
        This view will soon be updated in the next version of the program, please return to the main page by pressing "OK".
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => handleOK()} variant="outline-secondary">
            OK
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </div>
  );
}

export default WorkInProgress;