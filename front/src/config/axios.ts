import axios from 'axios';

const baseURL = 'https://translate-memo-api.onrender.com'

export default axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});