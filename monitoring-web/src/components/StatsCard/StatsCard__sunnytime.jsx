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
export class StatsCard__sunnytime extends Component {


  unix_time_to_time(unix_time){
    // return new Date(unix_time * 1e3).toISOString().slice(-13, -5);
    // unix_time = 1582154617
    return new Date(unix_time*1000).toLocaleTimeString("en-US")
  }

  

  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                <p>{this.props.statsText}</p>
                {this.unix_time_to_time(this.props.statsValue)}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StatsCard__sunnytime;
