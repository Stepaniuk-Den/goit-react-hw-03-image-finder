import axios from 'axios';

const instans = axios.create({
  baseURL: 'http://localhost:3001/api',
});
