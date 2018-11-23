import React, {Component} from 'react'
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    SplineSeries,
    Grid,
    Legend,
    Title
} from "@devexpress/dx-react-chart-material-ui";

const SensorData = (sensorData) => {
    function startTime(date) {
        var today = new Date(date),
            h = today.getHours(),
            m = today.getMinutes();
        return h + ":" + m
    }

    var weatherData = sensorData.data.map(post => (
        {
            date: startTime(post.date),
            sbsP1: post.sbsP1,
            sbsP2: post.sbsP2,
            limit25: 30,
            limit10: 40
        }
    ))

    return (
        <Chart data={weatherData}>
            <ArgumentAxis name="date"/>
            <ValueAxis/>
            <Grid name="date"/>
            <Grid/>
            <SplineSeries name="ФПЧ 10" valueField="sbsP1" argumentField="date"/>
            <SplineSeries name="Нормална стойност ФПЧ 10" valueField="limit10" argumentField="date"/>
            <SplineSeries name="ФПЧ 2.5" valueField="sbsP2" argumentField="date"/>
            <SplineSeries name="Нормална стойност за ФПЧ 2.5" valueField="limit25" argumentField="date"/>
            <Legend/>
            <Title text="Стойности на замърсяване" position="top"/>
        </Chart>
    )
}

class Sensor extends Component {

    render() {
        return (
            <div>
                <SensorData data={this.props.data}/>
            </div>
        )
    }
}

export default Sensor
