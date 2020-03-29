import RTChart from 'react-rt-chart';
import React, { Component } from 'react'

export default class SurfaceTempChat extends Component {
    
    componentDidMount() {
        setInterval( () => this.forceUpdate(), 1000);
    }
    

    getRandomValue = () => {
        return Math.random(10); 
    }

    render() {

        let data = {
            date: new Date(),
            Temp: this.getRandomValue(),
        };

        let chart = {
            axis: {
                y: { min: 0, max: 10}
            },
            point: {
                show: true
            }
        };

        return (
            <RTChart
                fields = {['Temp']}
                data = {data}
                chart = {chart}
                >
            </RTChart>
        )
    }
}
