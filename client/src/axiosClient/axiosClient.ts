import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
  timeout: 10000,
});

let cookies: unknown[] = [];

axiosClient.interceptors.response.use((response) => {
  const sessionCookies = response.headers['set-cookie']
  if (sessionCookies) {
    sessionCookies.forEach((cookie) => {
      cookie = cookie.split(';')[0]
      cookies.push(cookie)
    })
  }
  return response
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Cookie = cookies.join(';') + ';'
  return config
});

export default axiosClient
