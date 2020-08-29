import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RealTimeChart from "./RealTimeChart";
import axios from "axios";

// https://codesandbox.io/s/wq5jwmkw8k?from-embed

const styles = theme => ({
  "chart-container": {
    height: 488.05,
    width: 470
  }
});

class SurfaceAndChargeSpeedChart extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Solar cell Surface Temperature",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: "#DC143C",
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "3",
          lineTension: 0.45,
          data: []
        },        
        {
          type: "line",
          label: "Charged Speed",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: "#6495ED",
          pointBorderColor: "#6495ED",
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
          //     max: 1000,
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

    axios.get('http://localhost:3001/solar_info_last')
    .then( response => response.data[0]) // SUCCESS
    .then( solar_info => {
      if(solar_info){
        let _temperature = solar_info.temperature.toFixed(2);
        // console.log(solar_info)
        const oldtemperatureDataSet = this.state.lineChartData.datasets[0];
        const newtemperatureDataSet = { ...oldtemperatureDataSet };
        console.log("@@@@@@@@@@@@@")
        console.log(newtemperatureDataSet.data)
        console.log("@@@@@@@@@@@@@")
        newtemperatureDataSet.data.push(_temperature);
        console.log("!!!!!!!!!!!!!")
        console.log(newtemperatureDataSet.data)
        console.log("!!!!!!!!!!!!!")

        
      axios.get('http://localhost:3001/controller_info_last')
        .then( response => response.data[0]) // SUCCESS
        .then( controller_output => {
          if(controller_output){
            let _yield_kwh = controller_output.yield_kwh;
            // console.log(controller_output)

            const oldyield_kwhDataSet = this.state.lineChartData.datasets[1];
            const newyield_kwhDataSet = { ...oldyield_kwhDataSet };
            newyield_kwhDataSet.data.push(_yield_kwh);
            console.log("$$$$$$$$$$$$$$$$$$$$$$")
            console.log(newyield_kwhDataSet.data)
            console.log("$$$$$$$$$$$$$$$$$$$$$$")
            
            
            const newChartData = {
              ...this.state.lineChartData,
              datasets:         [{
                type: "line",
                label: "Solar cell Surface Temperature",
                backgroundColor: "rgba(0, 0, 0, 0)",
                // borderColor: this.props.theme.palette.primary.main,
                // pointBackgroundColor: this.props.theme.palette.secondary.main,
                // pointBorderColor: this.props.theme.palette.secondary.main,
                borderWidth: "3",
                lineTension: 0.45,
                data: newtemperatureDataSet.data
              },        
              {
                type: "line",
                label: "Charged Speed",
                backgroundColor: "rgba(0, 0, 0, 0)",
                // borderColor: this.props.theme.palette.primary.main,
                // pointBackgroundColor: this.props.theme.palette.secondary.main,
                // pointBorderColor: this.props.theme.palette.secondary.main,
                borderWidth: "3",
                lineTension: 0.45,
                data: newyield_kwhDataSet.data
              }],
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

export default withStyles(styles, { withTheme: true })(SurfaceAndChargeSpeedChart);
