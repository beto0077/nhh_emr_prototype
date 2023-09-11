import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Img1 from '../photos/doctor7.jpg';
import Img2 from '../photos/doctor8.jpg';
import Img3 from '../photos/doctor9.jpg';

function OurDoctors() {
  return (
    <div>
      <Carousel className="container" style={{paddingLeft: 100, paddingRight: 100}}>
        <Carousel.Item>
          <Card>
            <Card.Img variant="top" height="500" src={Img1} />
            <Card.Body>
              <Card.Title className="text-warning">Dr. Devon Maverick</Card.Title>
              <Card.Subtitle>Oncologist</Card.Subtitle>
              <Card.Text>
                Specialist in chemotherapy.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card>
            <Card.Img variant="top" height="300" src={Img2} />
            <Card.Body>
              <Card.Title className="text-warning">Dr. Dillon Dixon</Card.Title>
              <Card.Subtitle>Psychiatrist</Card.Subtitle>
              <Card.Text>
                Specialist in curing schizophrenia.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card>
            <Card.Img variant="top" height="300" src={Img3} />
            <Card.Body>
              <Card.Title className="text-warning">Dr. Samanthan Debry</Card.Title>
              <Card.Subtitle>Heart Specialist</Card.Subtitle>
              <Card.Text>
                Specialist in treatment of Heart Strokes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
      <br/>
      <br/>
    </div>
  );
}

export default OurDoctors;