import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../component/EventList';
import Event from '../component/Event';
import { mockData } from '../component/mock-data';

describe('<EventList /> component', () => {
    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });
});