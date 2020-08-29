// import React from 'react'
 
// import ReactStoreIndicator from 'react-score-indicator'
 
// export default function SolarPowerIndicator() {

//     const [value, setValue] = useState(0);

//     const componentDidMount = () => {
//         setInterval( () => updateData(), 1000);
//     }

//     const updateData = () => {
//         setValue(getRandomValue())
//     }

//     const getRandomValue = () => {
//         return Math.random(10); 
//     }

//     return (
//         <ReactStoreIndicator
//           value={value}
//           maxValue={100}
//         />
//       )
// }




import React, { Component } from 'react'

import ReactStoreIndicator from 'react-score-indicator'
import GaugeChart from 'react-gauge-chart'
import styled from 'styled-components';

const P = styled.p`
  text-align: center;
  font-family: "Roboto","Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 40px;
`

export default class SolarPowerIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charged:props.charged,
      total:3000
    };
  }

  // componentDidMount = () => {
  //       // console.log(this.state.value)
  //       setInterval( () => {console.log(this.state.charged); this.updateData();}, 10000);
  // }

  // updateData = () => {
  //       this.setState({
  //           value: this.getRandomValue()
  //       })
  // }

  // getRandomValue = () => {
  //       return Math.random();
  // }

  componentWillReceiveProps(prop){
    this.setState({
      charged:this.state.charged + prop.charged
    }) 
}
  render () {
    return (
      // <ReactStoreIndicator
      //   value={this.state.value}
      //   maxValue={100}
      // />
      <div>
      <GaugeChart id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.33, 0.33, 0.33]}
        colors={['#EA4228', '#F5CD19', '#5BE12C']}
        percent={this.state.charged/this.state.total}
        arcPadding={0.01}
        textColor={"#000000"}
      />
      <P>{this.state.charged}W</P>
      </div>
    )
  }

}


