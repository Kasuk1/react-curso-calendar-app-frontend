import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/eventActions';

jest.mock('../../../actions/eventActions', () => ({
  eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const initState = {
  calendar: {
    activeEvent: {
      id: '6249c9c933c17b7da5c7c41a',
    },
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('<DeleteEventFab /> Tests', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call eventStartDelete on click', () => {
    wrapper.find('button').prop('onClick')();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
