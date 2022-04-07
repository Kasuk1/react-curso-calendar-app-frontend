import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true,
};

describe('authReducer Tests', () => {
  test('should return initState correctly', () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should finish authChecking', () => {
    const state = authReducer(initState, {
      type: types.authCheckingFinish,
    });
    expect(state).toEqual({
      checking: false,
    });
  });

  test('should authLogin and authLogout correctly', () => {
    const stateWithLogin = authReducer(initState, {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Tauriel',
      },
    });
    expect(stateWithLogin).toEqual({
      checking: false,
      uid: '123',
      name: 'Tauriel',
    });

    const stateWithLogout = authReducer(stateWithLogin, {
      type: types.authLogout,
    });
    expect(stateWithLogout).toEqual({ checking: false });
  });
});
