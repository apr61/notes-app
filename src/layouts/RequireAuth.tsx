import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useSAuth";

const RequireAuth = () => {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) return <h1>Loading...</h1>;
  if (currentUser === null) return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

export default RequireAuth;
