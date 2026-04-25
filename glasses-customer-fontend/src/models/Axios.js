import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL, // Sử dụng baseURL từ biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("customer_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.error("API Error:", error);

//     // if (!error.response) {
//     //   window.location.href = "/404";
//     //   return Promise.reject(error);
//     // }

//     // const status = error.response.status;

//     // if (status >= 500) {
//     //   window.location.href = "/404";
//     // }

//     // if (status === 404) {
//     //   window.location.href = "/404";
//     // }
//     // if (status === 401) {
//     //   localStorage.removeItem("token");
//     //   window.location.href = "/login"; // nếu có login
//     // }

//     return Promise.reject(error);
//   },
// );

const Api = {
  get: (url, params) => axiosInstance.get(url, { params }),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export default Api;
