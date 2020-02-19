import React, { Component } from 'react'
import axios from 'axios';

export default class Expected_charged_time extends Component {
    
    state = {
        battery_size : 30000,
        yield_kwh:0,
        hour:"00",
        minite:"00",
        second:"00",
        current_charged_w:"0",
        expected_charged:"0"
    }
    
      componentDidMount() {
        setInterval( () => this.updateData(), 10000);
      }
    
      updateData() {
        axios.get('http://localhost:3001/controller_info_last')
        .then( response => response.data[0]) // SUCCESS
        .then( controller_output => {
          if(controller_output){
            // let _solar_voltage = controller_output.solar_voltage.toFixed(2);
            // let _solar_current = controller_output.solar_current.toFixed(2);
            
            // let _battery_voltage = controller_output.battery_voltage.toFixed(2);
            // let _battery_current = controller_output.battery_current.toFixed(2);
            // let _battery_state = controller_output.battery_state;
            let _solar_charged = controller_output.solar_charged
            let _yield_kwh = controller_output.yield_kwh.toFixed(2);

            // console.log(controller_output)
            let need_to_charged_w = this.state.battery_size-_solar_charged;
            let expected_total_second = need_to_charged_w/_yield_kwh;
            expected_total_second = Math.floor(expected_total_second);

            let _expected_hour = Math.floor(expected_total_second/3600);
            expected_total_second -= _expected_hour*3600;
            let _expected_minite = Math.floor(expected_total_second/60);
            expected_total_second -= _expected_minite*60;
            let _expected_second = expected_total_second;

            _expected_hour=_expected_hour.toString();
            if(_expected_hour.length==1){
                _expected_hour = "0"+_expected_hour;
            }
            _expected_minite=_expected_minite.toString();
            if(_expected_minite.length==1){
                _expected_minite = "0"+_expected_minite;
            }
            _expected_second=_expected_second.toString();
            if(_expected_second.length==1){
                _expected_second = "0"+_expected_second;
            }
            this.setState({
                hour:_expected_hour,
                minite:_expected_minite,
                second:_expected_second,
                current_charged_w:_solar_charged,
                yield_kwh:_yield_kwh,
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
                <h2>Expected_charged : {this.state.expected_charged} W</h2>
                <h2>Charged : {this.state.current_charged_w} W</h2>
                <h2>{this.state.hour}:{this.state.minite}:{this.state.second}</h2>
            </div>
        )
    }
}
