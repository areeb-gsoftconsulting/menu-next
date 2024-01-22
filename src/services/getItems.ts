import { apiConfig } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

export default function getItems({ menuId, params }: any) {
  return axiosClient.get(
    apiConfig.baseUrl + apiConfig.items + "?menuId=" + menuId,
    { params: params }
  );
}
