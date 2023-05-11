import axios from 'axios';

const url = 'https://fly-simple.vercel.app';

const fetchApi = async (method, endpoint, headers, data) => {
  const response = await axios({
    method,
    url: `${url}${endpoint}`,
    headers,
    data,
  });
  return response.data;
};

export const fetchLogin = async (email, password) => {
  const response = await fetchApi('POST', '/api/user/create-session', null, {
    email,
    password,
  });
  return response;
};

export const fetchSignup = async (email, password, confirmPassword) => {
  const response = await fetchApi('POST', '/api/user/create', null, {
    email,
    password,
    confirmPassword,
  });
  return response;
};

export const fetchLogout = async (token) => {
  const response = await fetchApi(
    'POST',
    '/api/user/delete-session',
    { Authorization: `Bearer ${token}` },
    null,
  );
  return response;
};

export const fetchFlight = async (src, dest, date, token) => {
  const response = await fetchApi(
    'GET',
    `/api/flights/tariff/${src}/${dest}/${date}`,
    { Authorization: `Bearer ${token}` },
    null
  );
// const response = await fetch(
//     `${url}/api/flights/tariff/${src}/${dest}/${date}`, // url
//     { 
//       method: 'GET', // HTTP request method
//       headers: { Authorization: `Bearer ${token}` }, // request headers
//       body: null // request body
//     }
//   );
  return response;
};
