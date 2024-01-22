import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getVenues(data: any) {
  return axiosClient.get(apiConfig.baseUrl + apiConfig.venue + data);
}
