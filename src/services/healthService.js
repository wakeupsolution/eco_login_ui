import api from "../api/api";
import endpoints from "../api/endpoints";

export const checkBackend = async () => {
  const response = await api.get(endpoints.health);
  return response.data;
};