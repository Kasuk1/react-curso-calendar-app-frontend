import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/uiActions';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(openModal());
  };

  return (
    <button className='btn btn-primary fab' onClick={handleAddClick}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
