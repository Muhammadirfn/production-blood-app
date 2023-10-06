import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import API from '../../services/Api';
import { getCurrentUser } from '../../redux/features/auth/AuthAction';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();

  // get the user data
  const getUser = async () => {
    try {
      const { data } = await API.get('/auth/current-user');
      if (data.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      // Handle API errors more gracefully
      console.error('Error fetching current user:', error);
      // You might want to redirect to an error page or display a user-friendly message
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Add an empty dependency array

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
};

export default PrivateRoute;
