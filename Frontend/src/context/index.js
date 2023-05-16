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
  const [errorMsg, setErrorMsg] = useState('');
  const route = useNavigate()

  const handleErrorMsg = () => {
    setTimeout(() => {
      setErrorMsg('');
    }, 2500);
  }

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
      // console.log(response);
      if (response.message === 'session created successfully') {
        setUserEmail(response.user);
        // console.log(response.token);
        // console.log(JSON.stringify(response.token));
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('userEmail', JSON.stringify(response.user));
        setIsLogged(true);
        route('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response)
        setErrorMsg(error.response.data.message);
      else
        setErrorMsg(error.message);
    } finally {
      handleErrorMsg()
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
      if (error.response)
        setErrorMsg(error.response.data.message);
      else
        setErrorMsg(error.message);
    } finally {
      handleErrorMsg()
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
    } catch (error) {
      console.log(error);
      if (error.response)
        setErrorMsg(error.response.data.message);
      else
        setErrorMsg(error.message);
    } finally {
      handleErrorMsg()
      setLoading(false);
    }
  };

  const handleExplore = async (src, dest, date) => {
    try {
      setLoadingFlight(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetchFlight(src, dest, date, token);
      setFlightData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response)
        setErrorMsg(error.response.data.message);
      else
        setErrorMsg(error.message);
    } finally {
      handleErrorMsg()
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
    errorMsg,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { authContext, AuthProvider };
