import flights from '../data/flights.json';

export const getLogo = (code) => {
  const airline = flights[code];
  return airline;
};
