

// import axios from 'axios';

// // Set BASE_URL depending on environment
// const BASE_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:5000/api" // dev backend
//   : "/api";                    // production (same domain)

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add JWT token to request headers if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle 401 responses
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('jwt_token');
//       localStorage.removeItem('user_data');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
import axios from 'axios';

// Backend URL on Render
const BASE_URL = "https://everydaynewsbackend.onrender.com/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to request headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
