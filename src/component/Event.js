import React, { Component } from "react";

class Event extends Component {
    render() {
        // console.log(this.props)
        return <div>
            <p>{this.props.event.summary}</p>
            <p>{this.props.event.location}</p>
            <p>{this.props.event.start.dateTime}</p>
            <p>{this.props.event.description}</p>
            <br />
        </div>;
    }
}
export default Event;