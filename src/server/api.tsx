import axios from 'axios';
import Cookies from 'js-cookie';

export const server = "http://127.0.0.1:8000"

export const Api = axios.create({
  baseURL: `${server}/api/`
});

const authApi = axios.create({
  baseURL: `${server}/api/`
});

authApi.interceptors.request.use(async (config) => {
  const token = Cookies.get("gs-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* authApi.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {
        const token = Cookies.get("gs-token");

        const response = await Api.post('user/refresh', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const newToken = response.data.token;

        Cookies.set("gs-token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return authApi(originalRequest);
      } catch (e) {
        Cookies.remove("gs-token");

        window.location.href = "/sign-in";

        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
); */

export default authApi
