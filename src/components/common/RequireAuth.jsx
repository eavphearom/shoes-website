import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading, error, retry } = useAuth();
  const location = useLocation();
  if (loading) return <p role="status" className="p-10 text-center">Checking your session...</p>;
  if (error) return <div className="p-10 text-center"><p role="alert">{error}</p>
    <button type="button" className="mt-3 text-[#E96400]" onClick={retry}>Try again</button></div>;
  return isAuthenticated ? children : <Navigate to="/login" replace
    state={{ from: location.pathname + location.search, message: "Please sign in to continue." }} />;
}
