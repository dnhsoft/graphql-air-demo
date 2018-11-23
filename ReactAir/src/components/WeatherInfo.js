import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {withStyles} from '@material-ui/core/styles';
import roundTo from 'round-to';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        padding: theme.spacing.unit * 2,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

const boldStyle = {
    fontWeight: 'bold',
    display: 'inline'
};

const ONE_WEATHER_QUERY = gql`
  query OneWeatherQuery {
    allWeathers (orderBy: date_DESC, first: 1) {
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
    <Query query={ONE_WEATHER_QUERY}>
        {({loading, error, data}) => {
            if (loading) {
                return (
                    <div>
                        Loading...
                    </div>
                )
            }

            return (
                data.allWeathers.map(post => (
                    <div key={post.id}>
                        <Typography gutterBottom variant="subheading">Температура: <div style={boldStyle}>{roundTo(post.temperature,1)}</div> &deg;C</Typography>
                        <Typography gutterBottom>ФПЧ 2.5: <div style={boldStyle}>{post.sbsP2}</div> µg/m³</Typography>
                        <Typography gutterBottom>ФПЧ 10: <div style={boldStyle}>{post.sbsP1}</div> µg/m³</Typography>
                        <Typography gutterBottom>Атмосферно налягане: <div style={boldStyle}>{roundTo(post.pressure/100,2)}</div> hPa</Typography>
                        <Typography gutterBottom>Влажност на въздуха: <div style={boldStyle}>{post.humidity}</div> %</Typography>
                    </div>
                ))
            )

        }}
    </Query>
)

class WeatherInfo extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper>
                <Grid container spacing={16}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex"
                                 src="https://dnhsoft.com/wp-content/uploads/2016/05/logo-128.png"/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={16}>
                            <Grid item xs>
                                <DataWeather/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(WeatherInfo)
