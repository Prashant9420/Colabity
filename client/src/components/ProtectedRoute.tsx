import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/serverUrl";
import { setState } from "../features/user/authSlice";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: any) => state.auth.user != null);
  const navigate = useNavigate();
  const isTokenExpired = (token: any) => {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const tokenExpiry = tokenPayload.exp;
    console.log(tokenExpiry);
    console.log(Date.now() / 1000);
    return tokenExpiry < Date.now() / 1000;
  };
  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/v1/users/refresh-token`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.user).refreshToken
            }`,
          },
        }
      );

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      // setState({ loading: false, user: null, error: "" });
      localStorage.removeItem("user");
      // navigate("/login");
    }
  };
  useEffect(() => {
    if (
      localStorage.user &&
      isTokenExpired(JSON.parse(localStorage.user).accessToken)
    ) {
      refreshAccessToken();
    } else {
      console.log("token is valid or NO user was logged in");
    }

    if (!isAuth) {
      console.log(isAuth);
      navigate("/login");
    }
  }, [isAuth]);
  return isAuth ? children : null;
};

export default ProtectedRoute;
