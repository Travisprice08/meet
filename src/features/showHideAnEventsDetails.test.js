import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../component/mock-data';
import EventList from '../component/EventList';
import Event from '../component/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    let EventListWrapper;
    let EventWrapper;
    let AppWrapper;

    test('Event element is collapsed by default', ({ given, when, then }) => {
        given('user hasn’t expanded event for details', () => {
            EventListWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see the list of all events without details', () => {
            expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
        });
    });

    test('User can expand event to see details', ({ given, when, then }) => {
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
            EventListWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('the user clicked on a expand details button for a specific event', () => {
            EventWrapper.find('.ToggleButton').at(1).simulate('click');
        });

        then('the user should see details for this event', () => {
            expect(EventWrapper.find('.eventDetails')).toHaveLength(2);
        });
    });

    test('User can collapse element to hide event details', ({ given, when, then }) => {
        given('the details for the event was expanded', () => {
            AppWrapper = mount(<App />);
            EventListWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
            EventWrapper.find('.ToggleButton').at(1).simulate('click');
            EventWrapper.find('.eventDetails');
        });

        when('the user clicks on the collapse button', () => {
            EventWrapper.find('.ToggleButton').at(1).simulate('click');
        });

        then('the event details should be hidden', () => {
            expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
        });
    });
})