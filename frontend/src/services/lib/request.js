import axios from "axios";
import { API_BASE_URL } from "../../const/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(config.url === `${API_BASE_URL}/auth/login` || config.url === `${API_BASE_URL}/auth/signup`){
    config.headers['Content-Type'] = 'application/json';
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const request = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };
  const onError = (error) => {
    if(!!error){
      console.log(error);
    }
      if(!!error.response && !!error.response.data ){
        console.error(error.response.data.message);
      } 
      // else if(!!error.message ){
      //   toast.error(error.message);
      // }
    // }
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};

export default request;