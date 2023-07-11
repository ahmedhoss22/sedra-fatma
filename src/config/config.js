import axios from "axios"

const Api=axios.create({
    // baseURL:"http://localhost:5000",
    // baseURL:"http://172.31.27.191:5000",
    baseURL:"http://54.163.1.131:5000",
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