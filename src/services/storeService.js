import api from "../api/api";

// Create a store
export const createStore = async (storeData) => {
  const response = await api.post("/storeCreate", storeData);
  return response.data;
};

// Generate a test API key
export const generateTestKey = async (storeId) => {
  const response = await api.post(
    `/generateTestKey/${encodeURIComponent(storeId)}`
  );

  return response.data;
};

// Get store details
export const getStore = async (storeId) => {
  const response = await api.get(`/stores/${encodeURIComponent(storeId)}`);
  return response.data;
};

// Get store API keys
export const getStoreApiKeys = async (storeId) => {
  const response = await api.get(
    `/stores/${encodeURIComponent(storeId)}/api-keys`
  );

  return response.data;
};

// Get all stores
export const getStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};