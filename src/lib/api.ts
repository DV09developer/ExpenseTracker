import axios from "axios";

// Create an Axios instance with default configuration
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Include credentials (cookies) in requests
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token refresh handling variables
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  failedQueue = [];
};

// Add a response interceptor to handle 401 errors and refresh tokens
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 1. Don't try to "refresh" if the refresh-token call itself failed
    if (originalRequest?.url?.includes("/api/users/refresh-token")) {
      isRefreshing = false;
      processQueue(error);
      // Optionally: redirect to login here
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      // Attempt to refresh the token
      try {
        await api.post("/api/users/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Optionally: redirect to login / clear auth state here
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);