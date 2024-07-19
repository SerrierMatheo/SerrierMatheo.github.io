import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const api = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$apiProfile = api;
  }
};
