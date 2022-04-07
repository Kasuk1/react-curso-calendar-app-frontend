import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../actions/eventActions';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const {
    activeEvent: { id: activeEventId },
  } = useSelector((state) => state.calendar);

  const handleDelete = () => {
    dispatch(eventStartDelete(activeEventId));
  };

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
      <i className='fas fa-trash'></i>
      <span> Borrar evento</span>
    </button>
  );
};
