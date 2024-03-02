import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../app/features/user/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await axios.post("http://localhost:5000/api/v1/users/login", {
      email,
      password
    })
    setIsLoading(false);
    const isLoggedIn = data.status === 200;
    console.log(isLoggedIn)
    const userInfo = data.data;
    if(isLoggedIn){
      dispatch(login(userInfo.data));
    }
    navigate("/");
  }
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <br />
      <br />
      <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <br />
      <br />
      {(!isLoading)?<input type="submit"/>:"Loading..."}
      </form>
      
      <br />
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
