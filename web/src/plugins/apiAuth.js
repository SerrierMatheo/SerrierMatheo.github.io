import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const apiAuth = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiAuth.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );

    app.config.globalProperties.$apiAuth = apiAuth;
  }
};
