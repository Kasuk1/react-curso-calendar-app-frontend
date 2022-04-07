import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/authActions';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) return <h5>Authenticating...</h5>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={!!uid ? <Navigate to='/' /> : <LoginScreen />}
        />
        {/* <PublicRoute element={<LoginScreen />} isAuthenticated={!!uid} /> */}
        <Route
          path='/'
          element={!!uid ? <CalendarScreen /> : <Navigate to='/login' />}
        />
        {/* <PrivateRoute
          path='/'
          element={<CalendarScreen />}
          isAuthenticated={!!uid}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
