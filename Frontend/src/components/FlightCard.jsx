import React from 'react';
import '../styles/_card.scss';
import { getLogo } from '../utils/getLogo';
import moment from 'moment';


const FlightCard = ({ flight, src, dest }) => {
  const carrireCode = flight.airline.carrierCode;
  const duration = moment.duration(flight.duration);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const fareCharge = flight.tariff;

  return (
    <div className='flight-card'>
      <div className='flight-card__carrier-logo'>
        <img src={getLogo(carrireCode).logo} alt='Carrier Logo' />
      </div>
      <div className='flight-card__details'>
        <div className='flight-card__detail-flight-time'>
          <span className='flight-card__detail-flight-time_departure'>
            {src.toUpperCase()}
          </span>{' '}
          -
          <span className='flight-card__detail-flight-time_arrival'>
            {dest.toUpperCase()}
          </span>
        </div>
        <div className='flight-card__detail-carrier-name'>{getLogo(carrireCode).className}</div>
        <div className='flight-card__detail-duration'>{`${hours} hr ${minutes} min`}</div>
        <div className='flight-card__detail-fare-charge'>₹{fareCharge}</div>
      </div>
    </div>
  );
};

export default FlightCard;
