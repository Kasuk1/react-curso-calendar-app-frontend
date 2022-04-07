import { closeModal, openModal } from '../../actions/uiActions';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
  modalOpen: false,
};

describe('uiReducer Tests', () => {
  test('should return initState', () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should open and close modal', () => {
    const modalOpen = openModal();
    const state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = closeModal();
    const stateClose = uiReducer(state, modalClose);
    expect(stateClose).toEqual({ modalOpen: false });
  });
});
