import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      if (username === "" || email === "" || password === "") {
        toast.error("All fields are required");
        return;
      }
      setIsLoading(true);
      const data = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          username,
          email,
          password,
        }
      );
      setIsLoading(false);
      if (data.data.statusCode === 201) {
        navigate("/login");
      }
      console.log(data);
    } catch (err: any) {
      setIsLoading(false);
      const code=err.response.status;
      if(code===409)
        toast.error("User already exists");
      else
        toast.error("Something went wrong");
      console.log(err);
      
    }
  };
  const handleEnterKey = (e: any) => {
    if (e.code === "Enter") {
      handleRegister(e);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center w-full justify-center">
      {isLoading ? (
        <div className=" bg-black bg-opacity-50 fixed w-screen h-screen flex justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : null}
      <h1 className="mb-7 font-bold text-3xl">REGISTER</h1>
      <div className=" lg:w-1/3 md:w-1/2 w-2/3 border-2 border-accent p-12 rounded-xl shadow-2xl flex flex-col items-center hover:shadow-secondary transition-all duration-1000">
        <div className="flex flex-col w-full">
          <label className="input input-accent flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onKeyUp={handleEnterKey}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-accent flex items-center gap-2 mt-4">
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
          <input type="file" className="file-input file-input-accent w-full max-w-xs mt-4" />
        </div>
        <button
          className="btn btn-active btn-neutral mt-10 hover:bg-black hover:text-secondary"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
      <div className="mt-8">
        Already have an account?&nbsp;&nbsp;
        <Link to="/login" className="mt-5 text-accent hover:border-b-[1px] border-accent">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
