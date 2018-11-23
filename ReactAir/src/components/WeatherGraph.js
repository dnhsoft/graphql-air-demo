import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Temperature from './Temperature'
import Pressure from './Pressure'
import Humidity from './Humidity'
import Sensor from './Sensor'

const ALL_WEATHER_QUERY = gql`
  query AllWeatherQuery {
    allWeathers (orderBy: date_ASC, last:30) {
      id
      date
      humidity
      pressure
      sbsP1
      sbsP2
      temperature
    }
  }
`

const DataWeather = () => (
    <Query query={ALL_WEATHER_QUERY}>
        {({loading, error, data}) => {
            if (loading) {
                return (
                    <div>
                        Loading...
                    </div>
                )
            }

            return (
                <div>
                    <Sensor data={data.allWeathers}/>
                    <Temperature data={data.allWeathers}/>
                    <Humidity data={data.allWeathers}/>
                    <Pressure data={data.allWeathers}/>
                </div>

            )

        }}
    </Query>
)

class WeatherGraph extends Component {
    render() {
        return (
            <div>
                <DataWeather/>
            </div>

        )
    }
}

export default WeatherGraph
