import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getVenueSlugs(venueNameSearch: any) {
  return axiosClient.get(
    apiConfig.baseUrl + apiConfig.venue + "?venueNameSearch=" + venueNameSearch
  );
}
