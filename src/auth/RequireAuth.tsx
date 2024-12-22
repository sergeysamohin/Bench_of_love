import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks";
import { Navigate, useLocation } from "react-router";
import { LoadingPage } from "../pages/LoadingPage";

interface RequireAuthProps {
  children: ReactNode;
}

const NONAUTHORIZED_ROUTES = ["/login", "/register", "/login/", "/register/"]
const UNPROTECTED_ROUTES = NONAUTHORIZED_ROUTES.concat("/")

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname, checkAuth]);
  
  if (loading) {
    return <LoadingPage/>
  }

  if (!isAuthenticated && !UNPROTECTED_ROUTES.includes(location.pathname)) {
    return <Navigate to="/login" replace/>;
  }

  if (isAuthenticated && NONAUTHORIZED_ROUTES.includes(location.pathname)) {
    return <Navigate to="/stories" replace/>
  }

  return children;
}
