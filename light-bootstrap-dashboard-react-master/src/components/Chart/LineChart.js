// https://www.chartjs.org/docs/latest/
// https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a


import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RealTimeChart from "./RealTimeChart";
import axios from "axios";

// https://codesandbox.io/s/wq5jwmkw8k?from-embed

const styles = theme => ({
  "chart-container": {
    height: 600,
    width: 750
  }
});

class LineChart extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Solar cell Surface Temperature",
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
          ticks: {
              max: 100,
              min: 0,
              stepSize: 10
          }
      }]
      }
    },
    rec:this.props.timePeriod
  };

  componentWillMount(){
    console.log("__props__"+this.props.timePeriod)
    console.log(this.state.rec)
    // this.getDataFromDatabase();
  }
  componentDidMount() {
    this.getDataFromDatabase(this.props.timePeriod);
  }
  componentWillReceiveProps(prop){
    console.log(prop)
    // this.setState({rec:prop.timePeriod})
    this.getDataFromDatabase(prop.timePeriod)
  }
  getDataFromDatabase(_timePeriod){
    axios.get('http://localhost:3001/solar_info_last_'+_timePeriod)
    .then( response => response.data) // SUCCESS
    .then( solar_infos => {
      if(solar_infos){
        // console.log(Object.values(solar_infos))
        let temperatures = solar_infos.map( solar_info => solar_info.temperature.toFixed(2))
        let _labels = solar_infos.map(solar_info => solar_info.timestamp.slice(5,19)) 
        // labels 
        console.log(temperatures)
        console.log(_labels)

        // console.log(...this.state.lineChartData)

        const oldBtcDataSet = this.state.lineChartData.datasets[0];
        const newBtcDataSet = { ...oldBtcDataSet };
        newBtcDataSet.data = temperatures;

        const newChartData = {
            ...this.state.lineChartData,
            datasets: [newBtcDataSet],
            labels:_labels
        };
        this.setState({ lineChartData: newChartData });
        // console.log(this.state)
      }
    })
    .catch( response => { console.log(response); }); // ERROR
    // let weatherData = this.fetchTempFromAPI()
    // console.log(weatherData)
  }


  render() {

    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>    
  {/* <p>{this.state.rec}</p> */}
        <RealTimeChart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        ></RealTimeChart>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LineChart);
