import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WeatherInfo from "./components/WeatherInfo";
import WeatherGraph from "./components/WeatherGraph";

const httpLink = new HttpLink({uri: 'https://api.graph.cool/simple/v1/cjosmtbbkjl0a01018lkzssjd'})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <ApolloProvider client={client}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    Weather
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <WeatherInfo/>
                        <div>
                            <WeatherGraph/>
                        </div>
                    </ApolloProvider>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
