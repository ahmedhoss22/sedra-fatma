import axios from "axios"

const Api=axios.create({
    baseURL:"http://localhost:5000",
    // baseURL:"https://sedra-fatma.onrender.com",
    headers: {
        'Content-Type': 'application/json'
    },
})
Api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('adminToken')
       if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
export default Api;