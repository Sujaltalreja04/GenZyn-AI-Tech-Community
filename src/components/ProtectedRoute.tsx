import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { SkeletonLoader } from "./SkeletonLoader";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="main-container" style={{ paddingTop: "180px", paddingBottom: "100px" }}>
        <SkeletonLoader variant="card" count={3} />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
