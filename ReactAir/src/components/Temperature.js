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

const TemperatureData = (temperatureData) => {

    function startTime(date) {
        var today = new Date(date),
            h = today.getHours(),
            m = today.getMinutes();
        return h + ":" + m
    }

    var weatherData = temperatureData.data.map(post => (
        {
            date: startTime(post.date),
            temperature: post.temperature,
        }
    ))

    return (
        <Chart data={weatherData}>
            <ArgumentAxis name="date"/>
            <ValueAxis/>
            <Grid name="date"/>
            <Grid/>
            <SplineSeries name="Температура  &deg;C" valueField="temperature" argumentField="date"/>
            <Title text="Температура на въздуха" position="top"/>
            <Legend/>
        </Chart>
    )

}

class Temperature extends Component {
    render() {
        return (
            <div>
                <TemperatureData data={this.props.data}/>
            </div>
        )
    }
}

export default Temperature
