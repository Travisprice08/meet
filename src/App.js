import React, { Component } from 'react';
import './App.css';
import EventList from './component/EventList';
import CitySearch from './component/CitySearch';
import NumberOfEvents from './component/NumberOfEvents';
import { extractLocations, getEvents } from './component/api';
import './nprogress.css';

import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 12,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
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
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEventCount={(e) => this.updateEventCount(e)} />
      </div>
    );
  }
}

export default App;