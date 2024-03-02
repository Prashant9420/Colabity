import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (username === "" || email === "" || password === "") {
        throw new Error("All fields are required");
      }
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
    } catch (err: any) {
      console.log(err.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        {!isLoading ? <input type="submit" /> : "Loading..."}
      </form>

      <br />
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
