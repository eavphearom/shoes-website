import { useEffect, useState } from "react";
import bannerService from "../services/bannerService";

export default function useBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await bannerService.getAll(controller.signal);
        if (controller.signal.aborted) return;
        setBanners(response.data ?? []);
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(error.response?.data?.message || "Failed to load banners.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBanners();

    return () => controller.abort();
  }, []);

  return {
    banners,
    loading,
    error,
  };
}
