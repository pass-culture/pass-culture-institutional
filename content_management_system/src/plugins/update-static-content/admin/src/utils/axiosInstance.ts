import axios from "axios";

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async (config) => {
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.reload();
    }

    throw error;
  },
);

export default instance;
