// ✨ Frontend Game - Version
import axios from 'axios';

const PORT = 3500;

export default axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const axiosPrivate = axios.create({
  baseURL: `http://localhost:${PORT}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
