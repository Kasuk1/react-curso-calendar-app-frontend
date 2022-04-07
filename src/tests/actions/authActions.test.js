import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import {
  startChecking,
  startLogin,
  startLogout,
  startRegister,
} from '../../actions/authActions';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

let token = '';

describe('authActions Tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should startLogin correctly', async () => {
    await store.dispatch(startLogin('lucero@hotmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1]); If we need the token
  });

  test('should startLogin incorrectly', async () => {
    await store.dispatch(startLogin('igor@hotmail.com', '123456789'));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Email or password are incorrect',
      'error'
    );

    await store.dispatch(startLogin('imnotigor@hotmail.com', '123456'));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Email or password are incorrect',
      'error'
    );
  });

  test('should startRegister correctly', async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Marco',
          token: 'abc123abc123',
        };
      },
    }));

    await store.dispatch(startRegister('Test', 'test@test.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Marco',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123abc123');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('should startChecking correctly', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Marco',
          token: 'abc123abc123',
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Marco',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123abc123');
  });

  test('should startLogout correctly', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogout,
    });

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
