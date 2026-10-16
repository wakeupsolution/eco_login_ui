import api from "../api/api";
import endpoints from "../api/endpoints";

export const registerOrganization = async (formData) => {
  const response = await api.post(
    endpoints.register,
    formData
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post(
    endpoints.login,
    credentials
  );

  return response.data;
};