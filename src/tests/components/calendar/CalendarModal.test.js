import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventClearActiveEvent,
  eventStartUpdate,
  eventStartAddNew,
} from '../../../actions/eventActions';

jest.mock('../../../actions/eventActions', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');

const initState = {
  ui: {
    modalOpen: true,
  },
  auth: {
    uid: '123',
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hello world',
      notes: 'Some notes',
      start: now.toDate(),
      end: nowPlusOne.toDate(),
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
    <CalendarModal />
  </Provider>
);

describe('<CalendarModal /> Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show modal', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true); //It's useless because the component exists and is just hidden
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call the action of update and close the modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should show error field if title is not set', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    );
  });

  test('should create a new event', () => {
    const initState = {
      ui: {
        modalOpen: true,
      },
      auth: {
        uid: '123',
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hello test calendar modal',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hello test calendar modal',
      notes: '',
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should validate the dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hello test calendar modal',
      },
    });

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe ser mayor a la de inicio',
      'error'
    );
  });
});
