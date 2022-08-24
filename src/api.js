import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401
};

const BASE_URL = 'https://eurotech.antushev.com/api';
const TIMEOUT = 15000;
const WITH_CREDENTIALS = false;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: WITH_CREDENTIALS
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}
