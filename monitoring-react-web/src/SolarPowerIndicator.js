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

export default class SolarPowerIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {value:0};
  }

  componentDidMount = () => {
        setInterval( () => this.updateData(), 1000);
  }

  updateData = () => {
        this.setState({
            value: this.getRandomValue()
        })
  }

  getRandomValue = () => {
        return Math.round(Math.random()*100);
  }

  render () {
    return (
      <ReactStoreIndicator
        value={this.state.value}
        maxValue={100}
      />
    )
  }

}


