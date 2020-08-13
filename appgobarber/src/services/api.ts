import axios from 'axios';

const ipv4 = '192.168.0.10';

const api = axios.create({
  baseURL: `http://${ipv4}:3333`,
});

export default api;
