import React, { Component } from 'react'
import axios from 'axios';

export default class Weather_data extends Component {
  
  componentDidMount() {
    setInterval( () => this.updateData(), 5000);
  }

  updateData() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-86&appid=631834fd61a1d3309f1beefed08165e1')
    .then( response => response.data) // SUCCESS
    .then( weatherData => {
      if(weatherData){
        let lon = weatherData.coord.lon;
        let lat = weatherData.coord.lat;
        
        let id = weatherData.weather.id;
        let main = weatherData.weather.main;
        let description = weatherData.weather.description;
        let icon = weatherData.weather.icon;
        
        let temp = weatherData.main.temp;
        let feels_like = weatherData.main.feels_like;
        let temp_min = weatherData.main.temp_min;
        let temp_max = weatherData.main.temp_max;
        let pressure = weatherData.main.pressure;
        let humidity = weatherData.main.humidity;
        
        let wind_speed = weatherData.wind.speed;
        let wind_deg = weatherData.wind.deg;
        let wind_gust = weatherData.wind.gust;
        console.log(weatherData)
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
        weather_data
      </div>
    )
  }
}
