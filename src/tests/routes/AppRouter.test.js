import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../routes/AppRouter';

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

// store.dispatch = jest.fn();

describe('<AppRouter /> Tests', () => {
  test('should show Authenticating...', () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    //expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('should show PublicRoute', () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should show PrivateRoute', () => {
    const initState = {
      ui: {
        modalOpen: false,
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'Marco',
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
