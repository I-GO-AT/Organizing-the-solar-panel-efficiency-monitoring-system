import React, { Component } from 'react'
import axios from 'axios';

export default class Weather_data extends Component {
 
  state = {
    lon:40,
    lat:-86,
    description:"sunny",
    icon:"sunny-icon",
    temp:38,
    humidity:50
  }
  componentDidMount() {
    setInterval( () => this.updateData(), 500000);
  }

  updateData() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-86&appid=631834fd61a1d3309f1beefed08165e1')
    .then( response => response.data) // SUCCESS
    .then( weatherData => {
      if(weatherData){
        let _lon = weatherData.coord.lon;
        let _lat = weatherData.coord.lat;
        
        let _id = weatherData.weather[0].id;
        let _main = weatherData.weather[0].main;
        let _description = weatherData.weather[0].description;
        let _icon = weatherData.weather[0].icon;
        
        let _temp = weatherData.main.temp;
        let _feels_like = weatherData.main.feels_like;
        let _temp_min = weatherData.main.temp_min;
        let _temp_max = weatherData.main.temp_max;
        let _pressure = weatherData.main.pressure;
        let _humidity = weatherData.main.humidity;
        
        let _wind_speed = weatherData.wind.speed;
        let _wind_deg = weatherData.wind.deg;
        let _wind_gust = weatherData.wind.gust;
        console.log(weatherData)

        this.setState({
          lon:_lon,
          lat:_lat,
          description:_description,
          icon:_icon,
          temp:_temp,
          humidity:_humidity
        })
      }
      // const oldBtcDataSet = this.state.lineChartData.datasets[0];
      // const newBtcDataSet = { ...oldBtcDataSet };
      // newBtcDataSet.data.push(this.getRandomValue());
  
      // const newChartData = {
      //   ...this.state.lineChartData,
      //   datasets: [newBtcDataSet],
      //   labels: this.state.lineChartData.labels.concat(
      //     new Date().toLocaleTimeString()
      //   )
      // };
      // this.setState({ lineChartData: newChartData });

      // 여기에 state 업데이트하는 부분

    })
    .catch( response => { console.log(response); }); // ERROR
    // let weatherData = this.fetchTempFromAPI()
    // console.log(weatherData)
  }
  
  
  render() {
    return (
      <div>
        lon:{this.state.lon}<br/>
        lat:{this.state.lat}<br/>
        description:{this.state.description}<br/>
        icon:{this.state.icon}<br/>
        temp:{this.state.temp}<br/>
        humidity:{this.state.humidity}
      </div>
    )
  }
}
