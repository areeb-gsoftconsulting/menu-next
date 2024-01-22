import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getVenues() {
  return axiosClient.get(
    apiConfig.baseUrl + apiConfig.venue + "factory-girl-berlin"
  );
}
