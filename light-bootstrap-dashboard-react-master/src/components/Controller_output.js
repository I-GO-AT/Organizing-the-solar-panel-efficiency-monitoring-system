import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';



import solar_voltage_img from'assets/img/controller_icons/solar_voltage.png';
import solar_current_img from'assets/img/controller_icons/solar_current.png';
import battery_voltage_img from'assets/img/controller_icons/battery_voltage.png';
import battery_current_img from'assets/img/controller_icons/battery_current.png';
import battery_state_img from'assets/img/controller_icons/battery_state.png';

const Td = styled.td`
  text-align: center;
  font-family: "Roboto","Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
`
const Tr = styled.tr`
  margin: auto;
`
const Table = styled.table`
  margin: auto;
`



export default class Controller_output extends Component {

      state = {
          solar_voltage : 0,
          solar_current :0,
          battery_voltage :0,
          battery_current :0,
          battery_state : "Bulk"
      }

      componentDidMount() {
        setInterval( () => this.updateData(), 10000);
      }
    
      updateData() {
        axios.get('http://localhost:3001/controller_info_last')
        .then( response => response.data[0]) // SUCCESS
        .then( controller_output => {
          if(controller_output){
            let _solar_voltage = controller_output.solar_voltage.toFixed(2);
            let _solar_current = controller_output.solar_current.toFixed(2);
            
            let _battery_voltage = controller_output.battery_voltage.toFixed(2);
            let _battery_current = controller_output.battery_current.toFixed(2);
            let _battery_state = controller_output.battery_state;
            
            // console.log(controller_output)
    
            this.setState({
              solar_voltage:_solar_voltage,
              solar_current:_solar_current,
              battery_voltage:_battery_voltage,
              battery_current:_battery_current,
              battery_state:_battery_state,
            })

            console.log(this.state)
          }
        })
        .catch( response => { console.log(response); }); // ERROR
        // let weatherData = this.fetchTempFromAPI()
        // console.log(weatherData)
      }
      
      

      render() {
        return (
          <div>
            <Table>
              <Tr>
                <Td><img src={solar_voltage_img} height="66"></img></Td><Td>Solar Voltage : <br/>{this.state.solar_voltage}</Td><Td><img src={solar_current_img} height="66"></img></Td><Td>Solar Current : <br/>{this.state.solar_current}</Td>
              </Tr>
              <Tr>
                <Td><img src={battery_voltage_img} height="66"></img></Td><Td>Battery Voltage : <br/>{this.state.battery_voltage}</Td><Td><img src={battery_current_img} height="66"></img></Td><Td>Battery Current : <br/>{this.state.battery_current}</Td>
              </Tr>
              <Tr>
                <Td><img src={battery_state_img} height="66"></img></Td><Td>Battery State : <br/>{this.state.battery_state}</Td>
              </Tr>
            {/* <img src={solar_voltage_img} height="66"></img>Solar Voltage : {this.state.solar_voltage}
            <img src={solar_current_img} height="66"></img>Solar Current : {this.state.solar_current}<br/>
            <img src={battery_voltage_img} height="66"></img>Battery Voltage : {this.state.battery_voltage}
            <img src={battery_current_img} height="66"></img>Battery Current : {this.state.battery_current}<br/>
            <img src={battery_state_img} height="66"></img>Battery State : {this.state.battery_state} */}
            </Table>
          </div>
        )
      }
    }

