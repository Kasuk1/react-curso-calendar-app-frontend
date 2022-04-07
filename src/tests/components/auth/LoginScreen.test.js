import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/authActions';

jest.mock('../../../actions/authActions', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('<LoginScreen /> Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should execute dispatch(login())', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'igor@hotmail.com',
      },
    });
    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });

    wrapper.find('form').at(0).prop('onSubmit')({ preventDefault() {} });

    expect(startLogin).toHaveBeenCalledWith('igor@hotmail.com', '123456');
  });

  test('should not register when passwords are different', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '1234567',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({ preventDefault() {} });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'error',
      'Passwords need to match',
      'error'
    );
  });

  test('should execute dispatch(startRegister()) with equal passwords', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({ preventDefault() {} });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      'Tommy Shelby',
      'thomas@hotmail.com',
      '123456'
    );
  });
});
