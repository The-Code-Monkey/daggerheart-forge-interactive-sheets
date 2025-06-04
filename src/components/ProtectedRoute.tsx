import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-brand-900 via-brand-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
