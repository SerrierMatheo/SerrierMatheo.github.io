import axios from 'axios';

export default {
  install: (app, { baseURL }) => {
    const apiUsers = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiUsers.interceptors.request.use((config) => {
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$apiUsers = apiUsers;
  }
};
