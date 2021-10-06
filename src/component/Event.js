import React, { Component } from "react";
import { mockData } from "./mock-data";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"

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
        return <Col className="single-event">
            <Card>
                <Card.Header className="event-summary">{this.props.event.summary}</Card.Header>
                <Card.Text className="event-start-date">{this.props.event.start.dateTime}</Card.Text>
                <Card.Text className="event-location">{this.props.event.location}</Card.Text>

                {this.state.showHideDetails && (
                    <div className="eventDetails">
                        <h2>About event:</h2>
                        <p>{this.props.event.description}</p>
                    </div>
                )}
                <Button className="toggleBtn" onClick={this.toggleEvent}>
                    {!this.state.showHideDetails ? 'Shows Details' : 'Hide Details'}
                </Button>
                <br />
            </Card>
        </Col>;
    }
}
export default Event;