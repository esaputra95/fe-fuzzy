import { Navigate, useLocation } from "react-router-dom";

const Middleware = ({ page }: any) => {
  const location = useLocation();
  const token:string | null = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate to={'/login'} state={{ from: location }} replace />
    );
  }
  return page;
};


export default Middleware;