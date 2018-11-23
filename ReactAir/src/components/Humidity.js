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

const HumidityData = (humidityData) => {
    function startTime(date) {
        var today = new Date(date),
            h = today.getHours(),
            m = today.getMinutes();
        return h + ":" + m
    }

    var weatherData = humidityData.data.map(post => (
        {
            date: startTime(post.date),
            humidity: post.humidity
        }
    ))

    return (
        <Chart data={weatherData}>
            <ArgumentAxis name="date"/>
            <ValueAxis/>
            <Grid name="date"/>
            <Grid/>
            <SplineSeries name="Влажност %" valueField="humidity" argumentField="date"/>
            <Legend/>
            <Title text="Влажност на въздуха" position="top"/>
        </Chart>
    )
}

class Humidity extends Component {
    render() {
        return (
            <div>
                <HumidityData data={this.props.data}/>
            </div>
        )
    }
}

export default Humidity
