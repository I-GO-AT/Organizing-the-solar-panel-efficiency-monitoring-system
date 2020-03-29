import { ReactApexChart, Chart, ApexCharts} from 'react-apexcharts'

import React, { Component } from 'react'

export default class ApexChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          data: [10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50].slice()
        }],
        options: {
          chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime',
            range: 20,
          },
          yaxis: {
            max: 100
          },
          legend: {
            show: false
          },
        },
      
      
      };
    }

    // getNewSeries () {

    // }
  
    componentDidMount() {
      window.setInterval(() => {
        // getNewSeries(lastDate, {
        //   min: 10,
        //   max: 90
        // })
        
        ApexCharts.exec('realtime', 'updateSeries', [{
          data:[10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50].slice()
        }])
      }, 1000)
    }
  

    render() {
      return (
        

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
      );
    }


  }
