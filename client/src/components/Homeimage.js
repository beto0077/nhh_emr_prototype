import React from 'react';
import Card from 'react-bootstrap/Card';
import { MDBContainer } from 'mdbreact';
//import Img from '../photos/hospital.jpg';
import Img from '../components/Home/hospitalbg.jpg'

/*function Homeimage() {
  return (
    <div>
      <Card className="text-white">
        <Card.Img src={Img} alt="Card image" height="500" style={{opacity: "0.6"}}/>
        <Card.ImgOverlay>
          <Card.Title>
            <MDBContainer>
              <h1 className="font-weight-bold text-danger">Lifescape Hospital Ltd</h1>
              <br />
              <p className="font-weight-bold text-danger">Curing Generations for Ages</p>
            </MDBContainer>
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}*/
function Homeimage() {
  return (
    <div>
      <Card className="text-white">
        <Card.Img src={Img} alt="Card image" height="500"/>
        <Card.ImgOverlay style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Title>
            <MDBContainer>
              <h1 className="font-weight-bold text-light" style={{fontSize:'4rem', textShadow:'5px 5px 10px black'}}>New Hope Hospital Ltd</h1>
              <br />
              <p className="font-weight-bold text-light" style={{fontSize:'2rem', textShadow:'5px 5px 10px black', marginTop:'1rem'}}>Curing Generations for Ages</p>
            </MDBContainer>
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default Homeimage;