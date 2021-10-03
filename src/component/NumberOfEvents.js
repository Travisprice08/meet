import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            errorText: '',
            numberOfEvents: 12,
        })
    }

    handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 12) {
            return this.setState({
                errorText: 'Please enter a number between 0 and 12',
                numberOfEvents: '0'
            });
        } else {
            this.setState({
                numberOfEvents: number,
                errorText: '',
            });
            this.props.updateEventCount(event.target.value);
        }
    };

    render() {
        return (
            <div className="events-number">
                <p className="results">Limit Search Results</p>
                <input type="number" id="numberInput" value={this.state.numberOfEvents} className="numberInput" onChange={(e) => this.handleInputChanged(e)} />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;