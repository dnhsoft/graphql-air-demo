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

const PressureData = (data) => {
    function startTime(date) {
        var today = new Date(date),
            h = today.getHours(),
            m = today.getMinutes();
        return h + ":" + m
    }

    var weatherData = data.data.map(post => (
        {
            date: startTime(post.date),
            pressure: post.pressure / 100
        }
    ))

    return (
        <Chart data={weatherData}>
            <ArgumentAxis name="date"/>
            <ValueAxis/>
            <Grid name="date"/>
            <Grid/>
            <SplineSeries name="Налягане hPa" valueField="pressure" argumentField="date"/>
            <Legend/>
            <Title text="Атмосферно налягане" position="top"/>
        </Chart>
    )

}

class Pressure extends Component {
    render() {
        return (
            <div>
                <PressureData data={this.props.data}/>
            </div>
        )
    }
}

export default Pressure
