import React, { Component } from 'react';
import "./App.css";
import EventList from './component/EventList';
import CitySearch from './component/CitySearch';
import NumberOfEvents from './component/NumberOfEvents';
import EventGenre from './component/EventGenre';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap';
import { WarningAlert } from './component/Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './component/api';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 12,
    showWelcomeScreen: undefined
  }



  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      //console.log("Events:", events, this.state.numberOfEvents, location);
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      //console.log("LocationsEvent:", locationEvents);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents)
      });
    });
  }

  updateEventCount = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  render() {
    const { locations, numberOfEvents, events } = this.state
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <Container className="App">
        <h1>Meet App</h1>
        {!navigator.onLine ? (<WarningAlert text='No internet connection' />) : (<WarningAlert text='' />)}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEventCount={(e) => this.updateEventCount(e)} />

        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="city" type="category" name="city" />
              <YAxis dataKey="number" type="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <Row className="EventList" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <EventList events={this.state.events} />
        </Row>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </Container>
    );
  }
}

export default App;