import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getCategory({ menuId, params }: any) {
  return axiosClient.get(
    apiConfig.baseUrl + apiConfig.categories + "?menuId=" + menuId,
    { params: params }
  );
}
