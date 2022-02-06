import axios, { AxiosRequestConfig } from "axios";
// import store from "@/store";

const baseURL = "http://localhost:8080";
// const baseURL = "https://api.xav1er.com";

// 创建axios实例
const Axios = axios.create({
  baseURL: baseURL,
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// axios 请求拦截器
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 如果请求时有本地token（已登录状态）则自动将token加入请求头
  config.headers!.Authorization = `Bearer ${localStorage.token}`;
  return config;
});

// axios 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    // 请求成功
    return response;
  },
  (error) => {
    // 请求失败
    return error.response;
  }
);

export default Axios;
