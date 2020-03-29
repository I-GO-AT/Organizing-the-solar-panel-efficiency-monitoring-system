// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import RealTimeChart from "./RealTimeChart";
// import axios from 'axios';

// // https://codesandbox.io/s/wq5jwmkw8k?from-embed
// // http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-86&appid=631834fd61a1d3309f1beefed08165e1
// const styles = theme => ({
//   "chart-container": {
//     height: 400,
//     width: 500
//   }
// });

// class TestChart extends React.Component {
//   state = {
//     lineChartData: {
//       labels: [],
//       datasets: [
//         {
//           type: "line",
//           label: "weather Temperature",
//           backgroundColor: "rgba(0, 0, 0, 0)",
//           borderColor: this.props.theme.palette.primary.main,
//           pointBackgroundColor: this.props.theme.palette.secondary.main,
//           pointBorderColor: this.props.theme.palette.secondary.main,
//           borderWidth: "3",
//           lineTension: 0.45,
//           data: []
//         }
//       ]
//     },
//     lineChartOptions: {
//       responsive: true,
//       maintainAspectRatio: false,
//       tooltips: {
//         enabled: true
//       },
//       scales: {
//         xAxes: [
//           {
//             ticks: {
//               autoSkip: true,
//               maxTicksLimit: 10
//             }
//           }
//         ],
//         yAxes: [{
//           ticks: {
//               max: 8,
//               min: 4,
//               stepSize: 1
//           }
//       }]
//       }
//     }
//   };


//   componentDidMount() {
//     setInterval( () => this.updateData(), 5000);
//   }

//   updateData() {
//     axios.get('http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-86&appid=631834fd61a1d3309f1beefed08165e1')
//     .then( response => response.data) // SUCCESS
//     .then( weatherData => {
//       if(weatherData){
//         let lon = weatherData.coord.lon;
//         let lat = weatherData.coord.lat;
        
//         let id = weatherData.weather.id;
//         let main = weatherData.weather.main;
//         let description = weatherData.weather.description;
//         let icon = weatherData.weather.icon;
        
//         let temp = weatherData.main.temp;
//         let feels_like = weatherData.main.feels_like;
//         let temp_min = weatherData.main.temp_min;
//         let temp_max = weatherData.main.temp_max;
//         let pressure = weatherData.main.pressure;
//         let humidity = weatherData.main.humidity;
        
//         let wind_speed = weatherData.wind.speed;
//         let wind_deg = weatherData.wind.deg;
//         let wind_gust = weatherData.wind.gust;
//         // console.log(lon)
//       }
//       const oldBtcDataSet = this.state.lineChartData.datasets[0];
//       const newBtcDataSet = { ...oldBtcDataSet };
//       newBtcDataSet.data.push(this.getRandomValue());
  
//       const newChartData = {
//         ...this.state.lineChartData,
//         datasets: [newBtcDataSet],
//         labels: this.state.lineChartData.labels.concat(
//           new Date().toLocaleTimeString()
//         )
//       };
//       this.setState({ lineChartData: newChartData });
//     })
//     .catch( response => { console.log(response); }); // ERROR
//     // let weatherData = this.fetchTempFromAPI()
//     // console.log(weatherData)
//   }
  

//   getRandomValue = () => {
//     return 5+Math.random(); 
//   }

  


//   render() {

//     const { classes } = this.props;

//     return (
//       <div className={classes["chart-container"]}>
//         <RealTimeChart
//           data={this.state.lineChartData}
//           options={this.state.lineChartOptions}
//         ></RealTimeChart>
//       </div>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(TestChart);
