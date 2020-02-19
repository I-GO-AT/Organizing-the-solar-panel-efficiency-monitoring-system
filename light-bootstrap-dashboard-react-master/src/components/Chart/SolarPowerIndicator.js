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
      value:0,
      expected:0,
      total:0
    };
  }

  componentDidMount = () => {
        // console.log(this.state.value)
        setInterval( () => {console.log(this.state.value); this.updateData();}, 3000);
  }

  updateData = () => {
        this.setState({
            value: this.getRandomValue()
        })
  }

  getRandomValue = () => {
        return Math.random();
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
        colors={['#5BE12C', '#F5CD19', '#EA4228']}
        percent={this.state.value}
        arcPadding={0.01}
        textColor={"#000000"}
      />
      <P>{this.state.expected}/{this.state.total}</P>
      </div>
    )
  }

}


