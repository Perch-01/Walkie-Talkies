import axios from 'axios';
import endpoints from '../constants/endpoints';

const options = {
  baseURL: `${endpoints.MAIN_URL}`,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
const client = axios.create(options);

const onResponseSuccess = (response) => ({
  isSuccess: true,
  ...response,
});

const onResponseFail = (error) => Promise.reject({ isSuccess: false, ...error });

const onRequestSuccess = (config) => {
  console.log({ config });
  console.log('API: ', config.url);
  return config;
};

const onRequestFail = (error) => error;

client.interceptors.response.use(onResponseSuccess, onResponseFail);
client.interceptors.request.use(onRequestSuccess, onRequestFail);

export default client;
