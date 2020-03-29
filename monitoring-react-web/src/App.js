import React, { Fragment } from 'react';
import MyName from './MyName';
import Counter from './Counter';
import SurfaceTempChat from './SurfaceTempChat';
import TestChart from './TestChart';
import SolarPowerIndicator from './SolarPowerIndicator';
import RealTimeChart_2 from './RealTimeChart_2';
import ApexChart from './ApexChart';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import TestChart_weather from './TestChart_weather';
import Weather_data from './Weather_data';

function App() {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
          <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
      {/* <MyName name="Sehyeong"></MyName> */}
      {/* <Counter></Counter> */}
      {/* <SurfaceTempChat></SurfaceTempChat> */}
      <TestChart></TestChart><TestChart></TestChart><TestChart></TestChart>
      {/* <SolarPowerIndicator></SolarPowerIndicator> */}
      {/* <RealTimeChart_2></RealTimeChart_2> */}
      {/* <TestChart_weather></TestChart_weather> */}
      {/* <ApexChart></ApexChart> */}
      <Weather_data></Weather_data>
    </Fragment>
    );
}

export default App;
