import axios, { AxiosInstance } from "axios";
import { apiConfig } from "./apiConfig";

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  responseType: "json",
  validateStatus: () => true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
