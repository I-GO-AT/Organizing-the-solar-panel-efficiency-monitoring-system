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
import LineChart from "components/Chart/LineChart";
import React, {useState} from 'react'
export default function DataBaseCard(props){

  const [timePeriod, setTimePeroid] = useState("L1H")

  const onChangeTimePeroid = e => {
    let selectBox = e.target
    console.log(selectBox.options[selectBox.selectedIndex].value)
    // console.log(e.target.options[e.target.selectedIndex].value)
    setTimePeroid(selectBox.options[selectBox.selectedIndex].value)
  }

  // const setLineChartState = timePeriod => {
  //   setTimePeroid(timePeriod)
  // }


    return (
      <div className={"card" + (props.plain ? " card-plain" : "")}>
        <div className={"header" + (props.hCenter ? " text-center" : "")}>
          <h4 className="title">{props.title}</h4>
          <p className="category">{props.category}</p>
          <select name="time_period" onChange={onChangeTimePeroid}>
            <option value="L1H">Last 1hour</option>
            <option value="L3H">Last 3hour</option>
            <option value="L6H">Last 6hour</option>
            <option value="L12H">Last 12hour</option>
            <option value="LD">Last day</option>
            <option value="LW">Last week</option>
            <option value="LM">Last month</option>
          </select>
        </div>
        <div
          className={
            "content" +
            (props.ctAllIcons ? " all-icons" : "") +
            (props.ctTableFullWidth ? " table-full-width" : "") +
            (props.ctTableResponsive ? " table-responsive" : "") +
            (props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
{/* <p>{timePeriod}</p> */}
          {/* {this.props.content} */}
          <LineChart timePeriod={timePeriod} ></LineChart>
          <div className="footer">
            {props.legend}
            {props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={props.statsIcon} /> {props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  
}

