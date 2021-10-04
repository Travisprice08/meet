import React, { Component } from 'react';
import './App.css';
import EventList from './component/EventList';
import CitySearch from './component/CitySearch';
import NumberOfEvents from './component/NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './component/api';
import './nprogress.css';
import { WarningAlert } from './component/Alert';
import WelcomeScreen from './WelcomeScreen';

import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 12,
    showWelcomeScreen: undefined
  }

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
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        {!navigator.onLine ? (<WarningAlert text='No internet connection' />) : (<WarningAlert text='' />)}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEventCount={(e) => this.updateEventCount(e)} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;