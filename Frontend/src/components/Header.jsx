import React, { useContext, useEffect, useState } from 'react';
import '../styles/_header.scss';
import { Link } from 'react-router-dom';
import { authContext } from '../context';

const Header = () => {
  const { loading, isLogged, handleLogout, isLoggedInToken, userEmail, getUserEmail } =
    useContext(authContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (isLoggedInToken() || isLogged) {
      setIsLoggedIn(true);
      getUserEmail();
    } else {
      setIsLoggedIn(false);
    }
  }, [getUserEmail, isLogged, isLoggedInToken]);
  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__brand'>
        Fly Simple
      </Link>

      {isLoggedIn ? (
        <p>
          {userEmail.split('@')[0]}{' '}
          <button onClick={handleLogout} className='navbar__login-button'>
            {loading ? 'Logging Out' : 'Log Out'}
          </button>
        </p>
      ) : (
        <Link to='/login' className='navbar__login-button'>
          Log In
        </Link>
      )}
    </nav>
  );
};

export default Header;
