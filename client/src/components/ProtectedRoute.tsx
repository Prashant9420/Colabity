import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: any) => state.auth.user!==null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      console.log(isAuth);
      navigate("/login");
    }
  }, [isAuth]);
  return isAuth ? children : null;
};

export default ProtectedRoute;
