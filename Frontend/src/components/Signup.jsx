import React, { useContext, useEffect, useState } from 'react';
import '../styles/_signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context';

function Signup() {
  const { handleSignup, loadingSignUp, isLoggedInToken, isLogged } = useContext(authContext);
  const route = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoggedInToken() || isLogged) {
      route('/')
    }
  }, [isLogged, isLoggedInToken, route]);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleErrorTimer = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      handleSignup({ email, password, confirmPassword });
    } else {
      setErrorMessage('Passwords do not match');
      handleErrorTimer();
    }
  };

  return (
    <div className='signup'>
      <h2 className='signup__heading'>Sign up</h2>
      <p className='signup__error'>{errorMessage}</p>
      <form onSubmit={handleSubmit} className='signup__form'>
        <div className='signup__form__field signup__form__field--email'>
          <label htmlFor='email' className='signup__form__field__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            className='signup__form__field__input'
            required
          />
        </div>

        <div className='signup__form__field signup__form__field--password'>
          <label htmlFor='password' className='signup__form__field__label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            className='signup__form__field__input'
            required
          />
        </div>

        <div className='signup__form__field signup__form__field--confirm-password'>
          <label
            htmlFor='confirm-password'
            className='signup__form__field__label'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm-password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className='signup__form__field__input'
            required
          />
        </div>

        <div className='signup__form__field signup__form__field--submit'>
          <button type='submit'>{ loadingSignUp ? 'Signing Up' : 'Sign Up'}</button>
        </div>
      </form>
      <div className='signup__new'>
        Already User ?
        <span>
          {' '}
          <Link className='signup__new__login' to='/login'>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
