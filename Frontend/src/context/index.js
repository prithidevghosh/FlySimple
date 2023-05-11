import React, { createContext, useState } from 'react';
import { fetchFlight, fetchLogin, fetchLogout, fetchSignup } from '../api';
import { useNavigate } from 'react-router-dom';

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [loadingFlight, setLoadingFlight] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const route = useNavigate()

  const isLoggedInToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
      return true;
    }
    setIsLogged(false);
    return false;
  };

  const getUserEmail = () => {
    const userEmail = JSON.parse(localStorage.getItem('userEmail'));
    setUserEmail(userEmail);
    return userEmail;
  }

  const handleLogin = async (user) => {
    try {
      setLoading(true);
      const response = await fetchLogin(user.email, user.password);
      if (response.message === 'session created successfully') {
        setUserEmail(response.user);
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('userEmail', JSON.stringify(response.user));
        setIsLogged(true);
        route('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (user) => {
    try {
      setLoadingSignUp(true);
      const response = await fetchSignup(user.email, user.password, user.confirmPassword);
      if (response.message === 'user created') {
        route('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetchLogout(token);
      if (response.message === 'session successfully destroyed') {
        localStorage.clear();
        isLoggedInToken();
        setUserEmail('');
        setFlightData([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExplore =async (src, dest, date) => {
    try {
      setLoadingFlight(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetchFlight(src, dest, date, token);
      setFlightData(response.data);
    } catch (err) {
      console.log(err);
    } finally { 
      setLoadingFlight(false);
    }
  };

  const value = {
    userEmail,
    setUserEmail,
    isLogged,
    handleLogin,
    handleLogout,
    handleExplore,
    loading,
    isLoggedInToken,
    loadingSignUp,
    handleSignup,
    getUserEmail,
    loadingFlight,
    flightData,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { authContext, AuthProvider };
