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
    warningText: "",
    showWelcomeScreen: undefined
  }

  updateEventCount = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }

  updateEvents = (location) => {
    // If offline
    if (!navigator.onLine) {
      this.setState({
        warningText: "You are offline, information may be inaccurate."
      });
    } else {
      this.setState({
        warningText: ""
      });
    }

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
        if (!navigator.onLine) {
          this.setState({
            warningText: "You are offline, information may be inaccurate."
          });
        } else {
          this.setState({
            warningText: ""
          });
        }
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events)
          });
        }
      });
    }
    if (window.location.href.startsWith("http://localhost")) {
      this.setState({
        showWelcomeScreen: false
      });
    }
  }


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { locations, numberOfEvents, events } = this.state
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <Container className="App">
        <Row>
          <Col md={12}>
            <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
          </Col>
        </Row>
        <Row style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <h1>Meet App</h1>
            {!navigator.onLine ? (<WarningAlert text='No internet connection' />) : (<WarningAlert text='' />)}
          </Col>
        </Row>
        <Row style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          </Col>
        </Row>
        <Row style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <NumberOfEvents updateEventCount={(e) => this.updateEventCount(e)} />
          </Col>
        </Row>
        <Row style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <h4>Events in each city</h4>
          <div className="data-vis-wrapper">
            <div className="pie-chart">
              <EventGenre events={events} />
            </div>
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
                <YAxis allowDecimals={false} dataKey="number" type="number" name="number of events" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Row>
        <Row className="EventList" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <EventList events={this.state.events} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;