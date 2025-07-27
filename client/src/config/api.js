// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api-villa.nahsbyte.my.id',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      PROFILE: '/api/auth/profile',
      VERIFY: '/api/auth/verify',
      LOGOUT: '/api/auth/logout',
    },
    VILLAS: {
      LIST: '/api/villas',
      FEATURED: '/api/villas/featured/list',
      CATEGORIES: '/api/villas/categories/list',
      DETAIL: (id) => `/api/villas/${id}`,
    },
    ADMIN: {
      UPLOAD_IMAGES: '/api/admin/upload-images',
    }
  }
};

// Configure axios defaults
import axios from 'axios';

axios.defaults.baseURL = API_CONFIG.BASE_URL;
axios.defaults.timeout = 10000; // 10 seconds
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Request interceptor for logging
axios.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
axios.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axios; 