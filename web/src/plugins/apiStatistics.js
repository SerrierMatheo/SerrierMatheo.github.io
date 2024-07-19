import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const apiStatistics = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiStatistics.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$apiStatistics = apiStatistics;
  }
};
