import { mount } from 'enzyme';
import React from 'react';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { messages } from '../../../helpers/calendar-messages-español';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/eventActions';

jest.mock('../../../actions/eventActions', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const initState = {
  ui: {
    modalOpen: false,
  },
  auth: {
    uid: '123',
  },
  calendar: {
    events: [],
    activeEvent: {
      user: {
        _id: '1234',
      },
    },
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('<CalendarScreen /> Tests', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('tests with calendar interactions', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({
      start: 'Hola',
    });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' });

    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
});
