import React, { useContext, useEffect, useState } from "react";
import "../styles/_login.scss";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context';

const Login = () => {
  const { handleLogin, loading, isLoggedInToken, isLogged, errorMsg } = useContext(authContext);
  const route = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoggedInToken() || isLogged) {
      route('/')
    }
  }, [isLogged, isLoggedInToken, route]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleErrorTimer = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email < 1) {
      setErrorMessage('Email cannot be empty!');
      handleErrorTimer();
      return
    } else if (password < 1) {
      setErrorMessage('Password must be atleast 6 characters long!');
      handleErrorTimer();
      return
    }

    handleLogin({ email, password });
  };

  return (
    <form className="login">
      <h2 className="login__heading">Login</h2>
      <p className='login__error'>{errorMessage}{errorMsg}</p>
      <div className="login__field login__field--email">
        <label htmlFor="email" className="login__field__label">Email</label>
        <input
          type="email"
          id="email"
          className="login__field__input"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="login__field login__field--password">
        <label htmlFor="password" className="login__field__label">Password</label>
        <input
          type="password"
          id="password"
          className="login__field__input"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" className="login__button" onClick={handleSubmit}>
        {loading ? 'Logging In' : 'Log In'}
      </button>
      <div className='login__new'>New User ?<span>{' '}
        <Link className='login__new__signup' to='/signup'>Sign up</Link>
      </span></div>
    </form>
  );
};

export default Login;
