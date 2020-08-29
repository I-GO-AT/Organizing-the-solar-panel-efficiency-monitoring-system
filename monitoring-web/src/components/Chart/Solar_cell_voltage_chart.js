import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RealTimeChart from "./RealTimeChart";
import axios from "axios";

// https://codesandbox.io/s/wq5jwmkw8k?from-embed

const styles = theme => ({
  "chart-container": {
    height: 525.05,
    width: 470
  }
});

class Solar_cell_voltage_chart extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Solar Cell Voltage Chart",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "3",
          lineTension: 0.45,
          data: []
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        ],
        yAxes: [{
          // ticks: {
          //     max: 100,
          //     min: 0,
          //     stepSize: 10
          // }
      }]
      }
    }
  };

  // componentDidMount() {
  //   const subscribe = {
  //     type: "subscribe",
  //     channels: [
  //       {
  //         name: "ticker",
  //         product_ids: ["Solar cell Surface Temperature"]
  //       }
  //     ]
  //   };

  //   this.ws = new WebSocket("wss://ws-feed.gdax.com");

  //   this.ws.onopen = () => {
  //     this.ws.send(JSON.stringify(subscribe));
  //   };

  //   this.ws.onmessage = e => {
  //     const value = JSON.parse(e.data);
  //     if (value.type !== "ticker") {
  //       return;
  //     }

  //     const oldBtcDataSet = this.state.lineChartData.datasets[0];
  //     const newBtcDataSet = { ...oldBtcDataSet };
  //     newBtcDataSet.data.push(value.price);

  //     const newChartData = {
  //       ...this.state.lineChartData,
  //       datasets: [newBtcDataSet],
  //       labels: this.state.lineChartData.labels.concat(
  //         new Date().toLocaleTimeString()
  //       )
  //     };
  //     this.setState({ lineChartData: newChartData });
  //   };
  // }

  // componentWillUnmount() {
  //   this.ws.close();
  // }

  componentDidMount() {
    setInterval( () => this.updateData(), 10000);
  }


  updateData() {

    axios.get('http://localhost:3001/controller_info_last')
    .then( response => response.data[0]) // SUCCESS
    .then( solar_info => {
      if(solar_info){
        let _solar_voltage = solar_info.solar_voltage.toFixed(2);
        console.log(solar_info)
        const oldBtcDataSet = this.state.lineChartData.datasets[0];
        const newBtcDataSet = { ...oldBtcDataSet };
        newBtcDataSet.data.push(_solar_voltage);
    
        const newChartData = {
          ...this.state.lineChartData,
          datasets: [newBtcDataSet],
          labels: this.state.lineChartData.labels.concat(
            new Date().toLocaleTimeString()
          )
        };
        this.setState({ lineChartData: newChartData });

      }

    })
    .catch( response => { console.log(response); }); // ERROR
    // let weatherData = this.fetchTempFromAPI()
    // console.log(weatherData)


  }
  

  getRandomValue = () => {
    return 5+Math.random(); 
  }

  


  render() {

    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>
        <RealTimeChart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        ></RealTimeChart>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Solar_cell_voltage_chart);
