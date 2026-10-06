import { useEffect, useState } from "react";
import productService from "../services/productService";

export default function useProductDetail(id) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    id: null,
    product: null,
    loading: true,
    error: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      setState({ id, product: null, loading: true, error: "" });
      try {
        if (!/^\d+$/.test(id))
          throw new Error(
            "This product link is invalid. Please choose a product from the shop.",
          );
        const response = await productService.getById(id, controller.signal);
        if (controller.signal.aborted) return;
        if (response.error || !response.data)
          throw new Error(response.message || "Product not found.");
        setState({ id, product: response.data, loading: false, error: "" });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          id,
          product: null,
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Unable to load this product.",
        });
      }
    };
    fetchProduct();
    return () => controller.abort();
  }, [id, attempt]);
  return {
    product: state.id === id ? state.product : null,
    loading: state.id !== id || state.loading,
    error: state.id === id ? state.error : "",
    retry: () => setAttempt((value) => value + 1),
  };
}
