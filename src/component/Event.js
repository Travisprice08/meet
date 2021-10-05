import React, { Component } from "react";
import { mockData } from "./mock-data";

class Event extends Component {
    state = {
        showHideDetails: false
    };

    toggleEvent = () => {
        this.setState({
            showHideDetails: this.state.showHideDetails === true ? false : true
        })
    };

    mockData = JSON.parse(JSON.stringify(mockData));

    render() {
        var { btnText, event } = this.props;
        const { opened } = this.state;

        if (opened) {
            btnText = 'Hide Details';
        } else {
            btnText = 'View Details';
        }
        // console.log(this.props)
        return <div className="single-event">
            <h3 className="event-summary">{this.props.event.summary}</h3>
            <p className="event-start-date">{this.props.event.start.dateTime}</p>
            <p className="event-location">{this.props.event.location}</p>

            {this.state.showHideDetails && (
                <div className="eventDetails">
                    <h2>About event:</h2>
                    <p>{this.props.event.description}</p>
                </div>
            )}
            <button className="toggleBtn" onClick={this.toggleEvent}>
                {!this.state.showHideDetails ? 'Shows Details' : 'Hide Details'}
            </button>
            <br />
        </div>;
    }
}
export default Event;