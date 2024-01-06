import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://translate-memo-5cf100b7d182.herokuapp.com'
    : 'http://localhost:8080';

export default axios.create({
  baseURL,
  withCredentials: true,
});