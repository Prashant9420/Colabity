import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/user/authSlice";
import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Email or Password can't be empty");
      return;
    }
    setIsLoading(true);
    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      setIsLoading(false);
      const isLoggedIn = data.status === 200;
      const userInfo = data.data;
      if (isLoggedIn) {
        dispatch(login(userInfo.data));
        localStorage.setItem("justLoggedIn", "1");
        navigate("/");
      }

    } catch (err: any) {
      const code = err.response.status;
      setIsLoading(false);
      if(code===403)
        toast.error("user not found");
      else{
        toast.error("invalid credentials");
      }
    }
  };
  const handleEnterKey = (e: any) => {
    if (e.code === "Enter") {
      handleLogin(e);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center w-full justify-center">
      {isLoading ? (
        <div className=" bg-black bg-opacity-50 fixed w-screen h-screen flex justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : null}
      <h1 className="mb-7 font-bold text-3xl">LOGIN</h1>
      <div className=" lg:w-1/3 md:w-1/2 w-2/3 border-2 border-accent p-12 rounded-xl shadow-2xl flex flex-col items-center hover:shadow-secondary transition-all duration-1000">
        <div className="flex flex-col w-full">
          <label className="input input-accent flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onKeyUp={handleEnterKey}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-accent flex items-center gap-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onKeyUp={handleEnterKey}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          className="btn btn-active btn-neutral mt-10 hover:bg-black hover:text-secondary"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="mt-8">
        Don't have an account?&nbsp;&nbsp;
        <Link
          to="/register"
          className="mt-5 text-accent hover:border-b-[1px] border-accent"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;