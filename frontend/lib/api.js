import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Data APIs
export const dataAPI = {
  getFilterOptions: () => api.get("/data/filter-options"),
  getFilteredData: (filterData) => api.post("/data/filter", filterData),
  getDataById: (id) => api.get(`/data/${id}`),
  uploadData: (data) => api.post("/data/upload", data),
  getAllData: (params) => api.get("/data/all", { params }),
};

// Payment APIs
export const paymentAPI = {
  createOrder: (data) => api.post("/payment/create-order", data),
  verifyPayment: (data) => api.post("/payment/verify", data),
  getRazorpayKey: () => api.get("/payment/key"),
};

// Purchase APIs
export const purchaseAPI = {
  completePurchase: (id) => api.post(`/purchase/complete/${id}`),
  getMyPurchases: () => api.get("/purchase/my-purchases"),
  getPurchaseById: (id) => api.get(`/purchase/${id}`),
  getPurchasedData: (id) => api.get(`/purchase/${id}/data`),
};

export default api;
