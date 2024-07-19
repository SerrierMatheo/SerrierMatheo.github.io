import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const apiForum = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiForum.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$apiForum = apiForum;
  }
};
