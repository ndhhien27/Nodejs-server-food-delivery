import axios from 'axios';

const API_URL = 'https://fcm.googleapis.com/fcm/send';
const client = axios.create({});

client.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Request Wrapper with default success/error actions
 */
const request = async options => {
  const onSuccess = response => {
    console.log('Request Successful!', response.data);
    return response.data;
  };

  const onError = error => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
