import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        numberOfEvents: 32,
        infoText: "",
    }

    handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 99) {
            return this.setState({
                //errorText: 'Please enter a number between 0 and 99',
                numberOfEvents: ''
            });
        } else {
            this.setState({
                numberOfEvents: number,
                //errorText: '',
            });
            this.props.updateEventCount(event.target.value);
        }
    };

    render() {
        return (
            <div>
                <p>Limit Search Results</p>

                <input type="number" id="numberInput" value={this.state.numberOfEvents} className="numberInput" onChange={(e) => this.handleInputChanged(e)} />
            </div>
        );
    }
}

export default NumberOfEvents;