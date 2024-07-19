import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const apiConfigs = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiConfigs.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$apiConfigs = apiConfigs;
  }
};
