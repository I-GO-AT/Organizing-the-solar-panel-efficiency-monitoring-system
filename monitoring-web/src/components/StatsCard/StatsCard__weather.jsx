/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export class StatsCard__weather extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">
                <img width="42vx" height="42vx"src={"/img/weather_icons/"+this.props.bigIcon+".png"}></img>
              </div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                <p>{this.props.statsText}</p>
                {this.props.statsValue}
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
              {this.props.statsIcon} {this.props.statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard__weather;
