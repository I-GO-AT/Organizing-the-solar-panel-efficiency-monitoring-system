import React, { Component } from 'react'
import StatsCard__sunnytime from './StatsCard/StatsCard__sunnytime';
import SolarPowerIndicator from './Chart/SolarPowerIndicator';
import sunrise_icon from "assets/img/sunrise.png"
import sunset_icon from "assets/img/sunset.png"
import axios from 'axios';
import SolarPowerIndicator_expected from './Chart/SolarPowerIndicator_expected';
export default class Expected_power extends Component {

    state = {
        solar_voltage : 0,
        solar_current :0,
        battery_voltage :0,
        battery_current :0,
        battery_state : "Bulk",
        solar_charged:0,
        yield_kwh:0,
        sunrise:this.props.sunrise,
        sunset:this.props.sunset
    }


    componentWillReceiveProps(prop){
        console.log(prop)
        console.log("zzzzzzzzzzzzzzzzz")
        // this.setState({rec:prop.timePeriod})
        this.setState({
            sunrise:prop.sunrise,
            sunset:prop.sunset
        })
    }

    componentDidMount() {
      setInterval( () => this.updateData(), 10000);
    }
    
    get_expected_time(sunset_time){
        let current_time = Math.round((new Date()).getTime() / 1000);
        let expected_time = sunset_time - current_time
        if(expected_time>0){
            console.log(expected_time)
            console.log("---------")
            return expected_time
        }
        else{
            return 0
        }
    }
    get_expected_power(expected_time){
        let yield_kws = this.state.yield_kwh/3600
        console.log("yield_kws"+yield_kws)
        let expected_power_w = yield_kws * this.get_expected_time(this.state.sunset)
        //이거를 정수로 변환해서 출력
        expected_power_w = Math.round(expected_power_w)
        console.log(expected_power_w)
        console.log("---------")
        return expected_power_w
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

          let _solar_charged = controller_output.solar_charged;
          let _yield_kwh = controller_output.yield_kwh;
          // console.log(controller_output)
  
          this.setState({
            solar_voltage:_solar_voltage,
            solar_current:_solar_current,
            battery_voltage:_battery_voltage,
            battery_current:_battery_current,
            battery_state:_battery_state,
            solar_charged:_solar_charged,
            yield_kwh:_yield_kwh
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
                     <StatsCard__sunnytime
                        bigIcon={<img src={sunrise_icon} width="55vx" height="55vx"></img>}
                        statsText="Today's Sunrise"
                        statsValue={this.state.sunrise}
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last half">
                    </StatsCard__sunnytime>
                    <StatsCard__sunnytime 
                        bigIcon={<img src={sunset_icon} width="55vx" height="55vx"></img>}
                        statsText="Today's Sunset"
                        statsValue={this.state.sunset}
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last half">
                    </StatsCard__sunnytime>
                    <SolarPowerIndicator_expected
                        expected = {this.get_expected_power(this.state.sunset)}
                        total = {3000}
                    ></SolarPowerIndicator_expected>
                    
                    
                    
            </div>
        )
    }
}
