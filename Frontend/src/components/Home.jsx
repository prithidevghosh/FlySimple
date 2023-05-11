import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authContext } from '../context';
import { getCurrentDate } from '../utils/getCurrentDate';
import FlightCard from './FlightCard';

import '../styles/_home.scss';
import exchangeIcon from '../assets/exchange.png';
import searchIcon from '../assets/search.png';
import backhome from '../assets/homeBack.gif';

function Home() {
  const route = useNavigate();
  const {
    handleExplore,
    loadingFlight,
    isLoggedInToken,
    isLogged,
    flightData,
  } = useContext(authContext);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(getCurrentDate());
  const [errorMessages, setErrorMessages] = useState('');

  const handleExchange = (e) => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };
  const handleSource = (e) => {
    setSource(e.target.value);
  };
  const handleDestination = (e) => {
    setDestination(e.target.value);
  };
  const handleDate = (e) => {
    const dateValue = e.target.value;
    setDate(dateValue);
  };
  const handleErrorTimer = () => {
    setTimeout(() => {
      setErrorMessages('');
    }, 2000);
  };

  const handleSearch = () => {
    if (!isLoggedInToken() || !isLogged) {
      route('/login');
      return;
    }
    if (source === '' || destination === '') {
      setErrorMessages('Please enter source and destination');
      handleErrorTimer();
    } else if (source === destination) {
      setErrorMessages('Source and destination cannot be same');
      handleErrorTimer();
    } else {
      console.log(source, destination, date);
      handleExplore(
        source.toUpperCase().trim(),
        destination.toUpperCase().trim(),
        date
      );
    }
  };

  return (
    <>
      <div className='home'>
        <div className='home__head'>
          <img className='home__img' src={backhome} alt='title background' />
          <div className='home__overlay'>
            <span>Fly Simple</span>
          </div>
        </div>
        <div className='home__body'>
          <div className='home__wrapper'>
            <div className='home__source'>
              <input
                className='home__input'
                type='text'
                placeholder='Source'
                value={source}
                onChange={handleSource}
              />
            </div>
            <div className='home__exchange'>
              <img
                className='home__exchange-img'
                src={exchangeIcon}
                alt='exchange'
                onClick={handleExchange}
              />
            </div>
            <div className='home__destination'>
              <input
                className='home__input'
                type='text'
                placeholder='Destination'
                value={destination}
                onChange={handleDestination}
              />
            </div>
          </div>
          <div className='home__date'>
            <input
              className='home__input home__date-input'
              type='date'
              placeholder='Date'
              value={date}
              min={getCurrentDate()}
              onChange={handleDate}
            />
          </div>
          <div className='home__explore'>
            <p className='home__error'>{errorMessages}</p>

            <button className='home__search-btn' onClick={handleSearch}>
              <img
                className='home__search-icon'
                src={searchIcon}
                alt='search'
              />
              {loadingFlight ? 'Searching' : 'Search'}
            </button>
          </div>
        </div>

        <div className='home__flights'>{
          flightData.length > 0 ? flightData.map((flight, index) => {
            return <FlightCard key={`flight-card-${index}`} flight={flight} src={source} dest={destination} />;
          }
          ) : null
        }</div>
      </div>
    </>
  );
}

export default Home;
