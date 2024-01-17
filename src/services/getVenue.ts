import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getVenues() {
  return axiosClient.get(
    apiConfig.baseUrl + apiConfig.venue + "659e497b9ee186fae1457f66"
  );
}
