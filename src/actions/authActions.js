import Swal from 'sweetalert2';
import { fetchNoToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './eventActions';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchNoToken('auth', { email, password }, 'POST');
    const json = await resp.json();

    if (json.ok) {
      localStorage.setItem('token', json.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: json.uid,
          name: json.name,
        })
      );
    } else {
      Swal.fire('Error', json.msg, 'error');
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchNoToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
    const json = await resp.json();

    if (json.ok) {
      localStorage.setItem('token', json.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: json.uid,
          name: json.name,
        })
      );
    } else {
      Swal.fire('Error', json.msg, 'error');
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth/renew');
    const json = await resp.json();

    if (json.ok) {
      localStorage.setItem('token', json.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: json.uid,
          name: json.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventLogout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
