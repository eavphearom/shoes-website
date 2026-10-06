import { useEffect, useState } from "react";
import productService from "../services/productService";

export default function useShopFilters() {
  const [state, setState] = useState({ categories: [], brands: [], loading: true, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    const fetchFilters = async () => {
      try {
        const response = await productService.getShopFilters(controller.signal);
        if (controller.signal.aborted) return;
        if (response.error || !Array.isArray(response.data?.categories)
          || !Array.isArray(response.data?.brands)) {
          throw new Error("Unable to load shop filters.");
        }
        setState({ ...response.data, loading: false, error: "" });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({ categories: [], brands: [], loading: false,
          error: error.response?.data?.message || "Unable to load shop filters. Please refresh to try again." });
      }
    };
    fetchFilters();
    return () => controller.abort();
  }, []);
  return state;
}
