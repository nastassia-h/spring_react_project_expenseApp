import axios from "axios";

const axiosClient = axios.create({
   baseURL: `http://localhost:8080/`,
   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
})

axiosClient.interceptors.request.use((config) => {

   const token = localStorage.getItem('ACCESS_TOKEN')
   config.headers.Authorization = `Bearer ${token}`

   return config;
})

axiosClient.interceptors.response.use((response) => {
   return response;
}, (error) => {
   const { response } = error;
   if (response?.status === 401) {
      window.location.reload();
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('persist:root')
   }
   throw error
})

export default axiosClient;