import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/authActions';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>{name}</span>
      <button className='btn btn-outline-danger'>
        <i className='fa fa-sign-out-alt'></i>
        <span onClick={handleLogout}> Salir</span>
      </button>
    </div>
  );
};
