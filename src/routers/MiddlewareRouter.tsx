import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Middleware = ({ page }: {page:ReactNode}) => {
  const location = useLocation();
  const token:string | null = localStorage.getItem("token");
  if (!token) {

    return (
      <Navigate to={'/questionnaire'} state={{ from: location }} replace />
    );
  }
  return page;
};


export default Middleware;