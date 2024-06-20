import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BounceLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  let location = useLocation();
  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><BounceLoader color="#36d7b7" /></div>;
  }
  if (!user) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
