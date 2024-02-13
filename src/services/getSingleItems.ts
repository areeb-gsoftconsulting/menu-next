import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getSingleItems({ menuId, params }: any) {
  return axiosClient.get(apiConfig.baseUrl + apiConfig.items + "/" + params.id);
}
