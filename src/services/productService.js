import apiClient from "./apiClient";

// Get products for the Home page.
// Example: GET /home/products?type=new
const getHomeProducts = async (params = {}, signal) => {
  const response = await apiClient.get("/home/products", {
    params,
    signal,
  });

  return response.data;
};

const getShopFilters = async (signal) => {
  const response = await apiClient.get("/setting/filter/shop", { signal });
  return response.data;
};

const getById = async (id, signal) => {
  const response = await apiClient.get(`/home/products/${encodeURIComponent(id)}`, { signal });
  return response.data;
};

export default {
  getById,
  getHomeProducts,
  getShopFilters,
};
