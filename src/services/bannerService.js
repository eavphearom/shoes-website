import apiClient from "./apiClient";

const getAll = async (signal) => {
  const response = await apiClient.get("/home/banners", {
    signal,
  });

  return response.data;
};

export default {
  getAll,
};