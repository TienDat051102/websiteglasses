import axios from "axios";
import { showLoading, hideLoading } from "./loading";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();

    const status = error.response?.status;
    if (status === 401) {
      alert("Token hết hạn, vui lòng đăng nhập lại");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      console.error("API Error:", error.response?.data || error.message);

      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Lỗi server";

      alert(message);
    }

    return Promise.reject(error);
  },
);

export default api;
