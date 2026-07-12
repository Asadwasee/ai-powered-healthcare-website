import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // AAPKI EXACT KEYS: 'token' ki jagah 'healthcareToken' use kar rahe hain
    let token = localStorage.getItem('healthcareToken');

    // Fallback: Agar token direct na mile to healthcareUser ke andar check karein
    if (!token) {
      const userData = localStorage.getItem('healthcareUser');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          token = parsed.token || parsed.accessToken || parsed.data?.token;
        } catch (e) {
          console.error("Error parsing healthcareUser:", e);
        }
      }
    }

    if (token) {
      const cleanToken = typeof token === 'string' ? token.replace(/^"|"$/g, '') : token;
      config.headers.Authorization = `Bearer ${cleanToken}`;
    } else {
      console.warn("Authorization Warning: No token found under 'healthcareToken'!");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;