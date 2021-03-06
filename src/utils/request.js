import axios from 'axios';
import Loading from '@/components/loading';

const CODE_OK = 0;

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  _loading: true
});

instance.interceptors.request.use(
  config => {
    if (config._loading) {
      Loading.open();
    }

    return config;
  },
  err => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    if (res.config._loading) {
      Loading.close();
    }

    if (res.data.code === CODE_OK) {
      return res.data.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  err => {
    if (err.config._loading) {
      Loading.close();
    }

    return Promise.reject(err);
  }
);

export default instance;
