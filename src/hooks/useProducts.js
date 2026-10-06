import { useEffect, useState } from "react";
import productService from "../services/productService";

export default function useProducts(params = {}, { keepPreviousData = false } = {}) {
  // Stable filters prevent a new request on every render.
  const queryKey = JSON.stringify(Object.entries(params)
    .filter(([, value]) => value !== "" && value != null)
    .sort(([a], [b]) => a.localeCompare(b)));
  const [request, setRequest] = useState({ key: queryKey, page: 1, attempt: 0 });
  if (request.key !== queryKey) {
    setRequest({ key: queryKey, page: 1, attempt: 0 });
  }
  const [result, setResult] = useState({
    key: null, products: [], pagination: null, page: 0, error: "", loading: true,
  });
  const page = request.key === queryKey ? request.page : 1;
  const attempt = request.key === queryKey ? request.attempt : 0;

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      setResult((previous) => ({
        ...previous,
        ...(previous.key !== queryKey ? {
          products: keepPreviousData ? previous.products : [], pagination: null, page: 0,
        } : {}),
        key: queryKey, loading: true, error: "",
      }));
      try {
        const response = await productService.getHomeProducts({
          perPage: 10,
          ...Object.fromEntries(JSON.parse(queryKey)),
          pageNo: page,
        }, controller.signal);
        if (controller.signal.aborted) return;
        if (response.error || !Array.isArray(response.data)) {
          throw new Error(response.message || "Invalid product response.");
        }
        if (page > 1 && Number(response.pagination?.page_no) !== page) {
          throw new Error("The next page could not be loaded. Please try again.");
        }
        setResult((previous) => {
          const combined = page > 1 && previous.key === queryKey
            ? [...previous.products, ...response.data] : response.data;
          return {
            key: queryKey,
            products: [...new Map(combined.map((product) => [product.id, product])).values()],
            pagination: response.pagination ?? null,
            page, error: "", loading: false,
          };
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setResult((previous) => ({
          ...previous, loading: false,
          ...(page === 1 ? { products: [], pagination: null } : {}),
          error: error.response?.data?.message || error.message || "Failed to load products.",
        }));
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, [queryKey, page, attempt, keepPreviousData]);

  const isCurrent = result.key === queryKey;
  const products = isCurrent || keepPreviousData ? result.products : [];
  const pagination = isCurrent ? result.pagination : null;
  const error = isCurrent ? result.error : "";
  const loading = !isCurrent || result.loading || (result.page !== page && !error);
  const hasMore = Boolean(pagination
    && result.page < Number(pagination.total_page)
    && products.length < Number(pagination.total));
  const loadMore = () => {
    if (loading || !hasMore) return;
    setRequest((previous) => ({
      key: queryKey, page: result.page + 1, attempt: previous.attempt + 1,
    }));
  };

  return { products, loading, error, pagination, hasMore, loadMore };
}
