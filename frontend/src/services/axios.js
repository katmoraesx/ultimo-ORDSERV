import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',

});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// const res = await api.post('/register/', {
//   username: 'katmoraesx',
//   email: 'kat@icloud.com ',
//   password: '123'
// });
export default api;
